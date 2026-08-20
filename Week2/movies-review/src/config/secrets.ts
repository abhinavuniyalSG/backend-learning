import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const LOGGER_VARIABLES = {
  NODE_ENV: process.env.NODE_ENV || "DEVELOPMENT",
  LOG_LEVEL: process.env.LOG_LEVEL || "debug",
};

export const DB_VARIABLES = {
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_USERNAME: process.env.DB_USERNAME || "abc",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_LOGGING: Boolean(process.env.DB_LOGGING) || true,
  DB_DATABASE: process.env.DB_DATABASE || "movies_reviews",
};
