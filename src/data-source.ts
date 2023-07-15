import "reflect-metadata";
import { DataSource } from "typeorm";
import { postgresConfig } from "./config";

/**
 * AppDataSource is the TypeORM DataSource instance used to connect to the PostgreSQL database.
 * It provides the database configuration and entity information for TypeORM.
 */
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: postgresConfig.port,
  database: postgresConfig.database,
  username: postgresConfig.user,
  password: postgresConfig.password,
  synchronize: true,
  logging: false,
  entities: ["./src/entities/**"],
  migrations: ["./src/migrations/**"],
  subscribers: [],
});
