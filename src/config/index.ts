import 'dotenv/config';
import pkg from '../../package.json' with { type: 'json' };
import { z } from 'zod';

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
            windowMs: 60_000,
            max: 100,
            standardHeaders: true,
            legacyHeaders: false,
        };
    }
}

export const config = new AppConfig();