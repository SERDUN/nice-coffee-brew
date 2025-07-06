import { z } from "zod";
import { extendZodWithOpenApi, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

declare global {
    var registry: OpenAPIRegistry | undefined;
}

globalThis.registry ??= new OpenAPIRegistry();

export { z };
export const registry: OpenAPIRegistry = globalThis.registry!;