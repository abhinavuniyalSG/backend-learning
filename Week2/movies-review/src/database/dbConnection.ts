import { DataSource, type DataSourceOptions } from "typeorm/browser";
import { logger } from "../core/logger.js";
import { DB_VARIABLES } from "../config/secrets.js";

export class DatabaseConnection {
  public static connection: DataSource;
  public static async connectDB(): Promise<void> {
    const dbOptions: DataSourceOptions = {
      type: "postgres",
      host: DB_VARIABLES.DB_HOST,
      port: DB_VARIABLES.DB_PORT,
      username: DB_VARIABLES.DB_USERNAME,
      password: DB_VARIABLES.DB_PASSWORD,
      database: DB_VARIABLES.DB_DATABASE,
      synchronize: false,
      logging: DB_VARIABLES.DB_LOGGING,
      entities: ["src/models/**/*.ts"],
      migrations: ["src/migrations/**/*.ts"],
      // subscribers: [],
    };
    try {
      DatabaseConnection.connection = new DataSource({ ...dbOptions });
      await DatabaseConnection.connection.initialize();
      logger.info("Data Base connected ");
    } catch (e) {
      logger.error("Failed to connect to DB");
      logger.error(e);
      throw new Error("Failed to connect to DB");
    }
  }
}
