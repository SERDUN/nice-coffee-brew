import { createAppDataSource } from "./data-source.js";
import { ModuleRegistration } from "../di/index.js";

export const configModule: ModuleRegistration[] = [
    {token: "appDataSource", use: "function", value: createAppDataSource, scope: "singleton"},
];
