import winston from "winston";
const { combine, timestamp, json, colorize } = winston.format;
import { LOGGER_VARIABLES } from "../config/secrets.js";

const optionsFormats = [
  timestamp(),
  json(),
  LOGGER_VARIABLES.NODE_ENV !== "PRODUCTION"
    ? winston.format.prettyPrint()
    : undefined,
  colorize({ all: true }),
].filter((item) => item !== undefined);

const optionsTransports =
  LOGGER_VARIABLES.NODE_ENV === "PRODUCTION"
    ? [new winston.transports.File({ filename: "app.log" })]
    : [new winston.transports.Console()];

const options: winston.LoggerOptions = {
  level: LOGGER_VARIABLES.LOG_LEVEL || "INFO",
  format: combine(...optionsFormats),
  transports: optionsTransports,
};

export const logger = winston.createLogger(options);
