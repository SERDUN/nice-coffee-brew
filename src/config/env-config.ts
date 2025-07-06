import 'dotenv/config';
import pkg from '../../package.json' with { type: 'json' };
import { z } from "../openapi/registry.js";

const DEFAULT_PORT = 3000;
const DEFAULT_ENV = 'development';

const schema = z.object({
    PORT: z.coerce.number().default(DEFAULT_PORT),
    NODE_ENV: z.enum(['development', 'production', 'test']).default(DEFAULT_ENV),
    DB_TYPE: z.enum(['sqlite', 'postgres', 'mysql']).default('sqlite'),
    DB_PATH: z.string().optional(),
    DB_HOST: z.string().optional(),
    DB_PORT: z.coerce.number().optional(),
    DB_DATABASE: z.string().optional(),
    DB_USERNAME: z.string().optional(),
    DB_PASSWORD: z.string().optional(),
    DB_SYNCHRONIZE: z.coerce.boolean().default(true),
    DB_LOGGING: z.coerce.boolean().default(false),
    SENTRY_DSN: z.string().optional(),
    EXPERIMENTAL_API: z.coerce.boolean().optional(),
    CORS_ORIGIN: z.string().default("*"),
    ENABLE_CSP: z.coerce.boolean().default(false),
    CSP_CONNECT_SRC: z.string().optional(),
    OPENAPI_SERVERS: z.string().optional(),
    RATE_LIMIT_WINDOW: z.coerce.number().default(60_000), // ms
    RATE_LIMIT_MAX: z.coerce.number().default(100),
    RATE_LIMIT_POST_MAX: z.coerce.number().default(10),
});

type EnvSchema = z.infer<typeof schema>;

export interface RateLimitOptions {
    windowMs: number;
    max: number;
    standardHeaders: boolean;
    legacyHeaders: boolean;
}

export class AppConfig {
    private env: EnvSchema;

    constructor(rawEnv: NodeJS.ProcessEnv = process.env) {
        this.env = schema.parse(rawEnv);
    }

    get port(): number {
        return this.env.PORT;
    }

    get envName(): EnvSchema['NODE_ENV'] {
        return this.env.NODE_ENV;
    }

    get baseUrl(): string {
        return `http://localhost:${this.env.PORT}`;
    }

    get appName(): string {
        return pkg.name ?? 'Express API';
    }

    get appVersion(): string {
        return pkg.version ?? '1.0.0';
    }

    get dbConfig() {
        return {
            type: this.env.DB_TYPE,
            host: this.env.DB_HOST,
            port: this.env.DB_PORT,
            username: this.env.DB_USERNAME,
            password: this.env.DB_PASSWORD,
            database: this.env.DB_DATABASE,
        };
    }

    get rateLimit(): RateLimitOptions {
        return {
            windowMs: this.env.RATE_LIMIT_WINDOW,
            max: this.env.RATE_LIMIT_MAX,
            standardHeaders: true,
            legacyHeaders: false,
        };
    }

    get corsOrigin(): string {
        return this.env.CORS_ORIGIN;
    }

    get enableCsp(): boolean {
        return this.env.ENABLE_CSP;
    }

    get cspConnectSrc(): string[] {
        return (this.env.CSP_CONNECT_SRC ?? "'self'").split(/\s+/);
    }

    get openapiServers() {
        if (!this.env.OPENAPI_SERVERS) {
            return [{
                url: this.baseUrl,
                description: 'Default server',
            }];
        }
        return this.env.OPENAPI_SERVERS.split(";").map(s => {
            const [url, description] = s.split("|");
            return {
                url: url.trim(),
                description: (description ?? url).trim(),
            };
        });
    }
}

export const config = new AppConfig();
