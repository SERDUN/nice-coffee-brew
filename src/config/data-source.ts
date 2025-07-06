import { DataSource } from "typeorm";
import { Brew } from "../datasources/index.js";
import { config } from "./index.js";

const dbConfig = config.dbConfig;

export const AppDataSource = new DataSource({
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