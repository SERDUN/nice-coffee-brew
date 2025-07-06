import express from 'express';
import helmet from "helmet";
import cors from 'cors';
import rateLimit from "express-rate-limit";
import morgan from 'morgan';
import { pinoHttp } from 'pino-http';
import { config } from './config/index.js';
import brewRoutes from './features/brew/brew.routes.js';
import { scopePerRequest } from "awilix-express";
import { container } from "./di/index.js";

export function createApp() {
    const app = express();
    const apiRouter = express.Router();

    app.use(helmet());
    app.use(cors());
    app.use(rateLimit(config.rateLimit));
    app.use(morgan('dev'));
    app.use(pinoHttp());
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(scopePerRequest(container));

    apiRouter.use('/brews', brewRoutes);
    app.use('/api', apiRouter);
    return app;
}
