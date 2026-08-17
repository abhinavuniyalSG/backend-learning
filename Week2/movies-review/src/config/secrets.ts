import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const LOGGER_VARIABLES = {
  NODE_ENV: process.env.NODE_ENV || "DEVELOPMENT",
  LOG_LEVEL: process.env.LOG_LEVEL || "debug",
};
