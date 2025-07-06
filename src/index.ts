import 'reflect-metadata';
import { createApp } from './app.js';
import http from 'node:http';
import { config } from './config/index.js';
import { AppDataSource } from "./config/data-source.js";


await AppDataSource.initialize();

const app = createApp();
const server = http.createServer(app);

server.listen(config.port, () =>
    console.log(`${config.envName} API ready on http://localhost:${config.port}`)
);
