import { DataSource, type DataSourceOptions } from "typeorm/browser";
import { logger } from "../core/logger.js";

export class DatabaseConnection {
  public static connection: DataSource;
  public static async connectDB(): Promise<void> {
    const dbOptions: DataSourceOptions = {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "abhinavuniyal",
      password: "",
      database: "movies_reviews",
      synchronize: false,
      logging: true,
      // entities: [Post, Category],
      // subscribers: [],
      // migrations: [],
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
