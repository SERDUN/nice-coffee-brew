import { createApp } from './app.js';
import http from 'node:http';
import { config } from './config/index.js';

const app = createApp();
const server = http.createServer(app);


server.listen(config.port, () =>
    console.log(`${config.env} API ready on http://localhost:${config.port}`)
);
