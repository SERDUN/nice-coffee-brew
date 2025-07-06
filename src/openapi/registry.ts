import { extendZodWithOpenApi, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

declare global {
    var registry: OpenAPIRegistry | undefined;
}

globalThis.registry ??= new OpenAPIRegistry();

export const registry: OpenAPIRegistry = globalThis.registry;
