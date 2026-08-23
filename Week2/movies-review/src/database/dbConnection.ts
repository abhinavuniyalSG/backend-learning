import { DataSource } from "typeorm";
import { logger } from "../core/logger.js";
import { DB_VARIABLES } from "../config/secrets.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_VARIABLES.DB_HOST,
  port: DB_VARIABLES.DB_PORT,
  username: DB_VARIABLES.DB_USERNAME,
  password: DB_VARIABLES.DB_PASSWORD,
  database: DB_VARIABLES.DB_DATABASE,
  synchronize: false,
  // logging: DB_VARIABLES.DB_LOGGING,
  entities: ["src/database/models/**/*.ts"],
  migrations: ["src/database/migration/**/*.ts"],
  // subscribers: [],
});

export class DatabaseConnection {
  public static connection: DataSource;
  public static async connectDB(): Promise<void> {
    try {
      DatabaseConnection.connection = await AppDataSource.initialize();
      logger.info("Data Base connected ");
    } catch (e) {
      logger.error("Failed to connect to DB");
      logger.error(e);
      throw new Error("Failed to connect to DB");
    }
  }
}
