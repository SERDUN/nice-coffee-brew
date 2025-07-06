import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./registry.js";
import { config } from "../config/index.js";

export function generateSpecs() {
    const generator = new OpenApiGeneratorV3(registry!.definitions);

    return generator.generateDocument({
        openapi: '3.0.0',
        info: {
            title: config.appName ?? 'API',
            version: config.appVersion ?? '1.0.0',
            description: 'API documentation'
        },
        servers: config.openapiServers
    });
}
