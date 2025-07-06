import { Router } from 'express';
import { makeClassInvoker } from 'awilix-express';
import { BrewController } from './brew.controller.js';
import { validateDto } from "../../utils/index.js";
import { BrewCreateDto, BrewSchema, BrewUpdateDto } from "../../dto/index.js";
import { registry, z } from "../../openapi/registry.js";

const router = Router();
const api = makeClassInvoker(BrewController);

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
router.get('/', api('getAll'));

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
})

router.get('/:id', api('getById'));
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

router.post('/', validateDto(BrewCreateDto), api('create'));
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
router.put('/:id', validateDto(BrewUpdateDto), api('update'));

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
router.delete('/:id', api('delete'));

export default router;
