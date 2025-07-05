import express from 'express';
import helmet from "helmet";
import cors from 'cors';
import rateLimit from "express-rate-limit";
import morgan from 'morgan';
import { pinoHttp } from 'pino-http';
import { config } from './config/index.js';

export function createApp() {
    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(rateLimit(config.rateLimit));
    app.use(morgan('dev'));
    app.use(pinoHttp());
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    return app;
}
