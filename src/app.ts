import express from 'express';
import helmet from "helmet";
import cors from 'cors';
import rateLimit from "express-rate-limit";
import morgan from 'morgan';
import { pinoHttp } from 'pino-http';
import { config } from './config/index.js';
import brewRoutes from './features/brew/brew.routes.js';
import { scopePerRequest } from "awilix-express";
import { container, registerModules } from "./di/index.js";
import swaggerUi from 'swagger-ui-express';
import { brewModule } from "./features/brew/index.js";
import { configModule } from "./config/config.di.js";
import { notFoundMiddleware, rateLimitPostMiddleware } from "./utils/index.js";
import { generateSpecs } from "./openapi/specs.js";

export async function createApp() {
    const app = express();
    const apiRouter = express.Router();

    registerModules(container, configModule);
    registerModules(container, brewModule);

    const dataSource = container.resolve("appDataSource");
    await dataSource.initialize();

    app.use(helmet());
    app.use(cors());
    app.use(rateLimit(config.rateLimit));
    app.use(morgan('dev'));
    app.use(pinoHttp());
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(scopePerRequest(container));
    app.use(cors({origin: config.corsOrigin.split(',')}));

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(generateSpecs()));
    console.log(`Swagger docs → ${config.baseUrl}/docs`);

    apiRouter.use(rateLimitPostMiddleware);
    apiRouter.use('/brews', brewRoutes);
    app.use('/api', apiRouter);
    app.use(notFoundMiddleware);
    return app;
}
