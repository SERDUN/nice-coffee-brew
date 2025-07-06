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
import swaggerUi from 'swagger-ui-express';
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./openapi/registry.js";
import { BrewCreateDto, BrewSchema } from "./dto/index.js";
import { z } from "./openapi/registry.js";

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

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(generateSpecs()));
    console.log(`Swagger docs → ${config.baseUrl}/docs`);

    apiRouter.use('/brews', brewRoutes);
    app.use('/api', apiRouter);
    return app;
}

export function generateSpecs() {
    registry.registerPath({
        method: 'get',
        path: '/api/brews',
        tags: ['Brew'],
        description: 'Get all brews',
        responses: {
            200: {
                description: 'List of brews',
                content: {
                    'application/json': {
                        schema: z.array(BrewSchema)
                    }
                }
            }
        }
    });

    registry.registerPath({
        method: 'get',
        path: '/api/brews',
        tags: ['Brew'],
        description: 'Get all brews',
        responses: {
            200: {
                description: 'List of brews',
                content: {
                    'application/json': {
                        schema: z.array(BrewSchema)
                    }
                }
            }
        }
    });

    registry.registerPath({
        method: 'get',
        path: '/api/brews/{id}',
        tags: ['Brew'],
        description: 'Get brew by id',
        parameters: [
            {
                name: 'id',
                in: 'path',
                required: true,
                description: 'Brew ID'
            }
        ],
        responses: {
            200: {
                description: 'Brew found',
                content: {
                    'application/json': {
                        schema: BrewSchema
                    }
                }
            },
            404: {
                description: 'Brew not found'
            }
        }
    });

    registry.registerPath({
        method: 'post',
        path: '/api/brews',
        tags: ['Brew'],
        description: 'Create a new brew',
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: BrewCreateDto,
                    },
                },
            },
        },
        responses: {
            201: {
                description: 'Brew created',
                content: {
                    'application/json': {
                        schema: BrewSchema
                    }
                }
            },
            400: {
                description: 'Invalid request'
            }
        }
    });

    registry.registerPath({
        method: 'patch',
        path: '/api/brews/{id}',
        tags: ['Brew'],
        description: 'Update a brew',
        responses: {
            200: {
                description: 'Brew updated',
                content: {
                    'application/json': {
                        schema: BrewSchema
                    }
                }
            },
            404: {
                description: 'Brew not found'
            }
        }
    });

    registry.registerPath({
        method: 'delete',
        path: '/api/brews/{id}',
        tags: ['Brew'],
        description: 'Delete a brew',
        responses: {
            204: {
                description: 'Brew deleted'
            },
            404: {
                description: 'Brew not found'
            }
        }
    });

    const generator = new OpenApiGeneratorV3(registry!.definitions);

    return generator.generateDocument({
        openapi: '3.0.0',
        info: {
            title: config.appName ?? 'API',
            version: config.appVersion ?? '1.0.0',
            description: 'API documentation'
        },
        servers: [
            {
                url: 'https://nice-coffee-brew-production.up.railway.app/',
                description: 'Production server'
            }
        ]
    });
}
