import { DataSource } from "typeorm";
import { config } from "./env-config.js";
import { Brew } from "../datasources/index.js";

export function createAppDataSource(): DataSource {
    const dbConfig = config.dbConfig;
    return new DataSource({
        type: "postgres",
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.database,
        synchronize: true,
        logging: true,
        entities: [Brew],
    });
}
