import 'reflect-metadata';
import { createApp } from './app.js';
import http from 'node:http';
import { config } from './config/index.js';
import { logger } from "./config/logger.js";
import { container } from "./di/index.js";

const app = await createApp();
const server = http.createServer(app);

server.listen(config.port, () =>
    console.log(`${config.envName} API ready on http://localhost:${config.port}`)
);

const shutdown = async (signal: string) => {
    try {
        logger.info({signal}, '[shutdown] Received. Shutting down gracefully...');
        server.close(async (err) => {
            if (err) {
                logger.error({err}, '[shutdown] HTTP server close error');
                process.exit(1);
            }
            try {
                await container.dispose();
                logger.info('[shutdown] Graceful shutdown complete.');
                process.exit(0);
            } catch (disposeErr) {
                logger.error({err: disposeErr}, '[shutdown] DI dispose error');
                process.exit(1);
            }
        });
    } catch (e) {
        logger.error({err: e}, '[shutdown] Unexpected shutdown error');
        process.exit(1);
    }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));