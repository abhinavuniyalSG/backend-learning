import { pinoHttp } from "pino-http";
import { logger } from "../config/logger.js";

export const httpLoggerMiddleware = pinoHttp({ logger });
