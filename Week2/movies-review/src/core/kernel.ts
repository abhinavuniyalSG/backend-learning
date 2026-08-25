import express, { type Application } from "express";
import cors from "cors";
import { DatabaseConnection } from "../database/dbConnection.js";
import { ErrorMiddleware } from "../middleware/errorHandling.middleware.js";
import { RequestLoggerMiddleware } from "../middleware/requestLogger.middleware.js";
import { RateLimiterMiddleware } from "../middleware/rateLimiter.middleware.js";

class Kernel {
  private errorHandlingMiddleware = ErrorMiddleware.middleware;
  private margonHttpLogger = RequestLoggerMiddleware.requestLogger;
  private limiter = RateLimiterMiddleware.globalLimiter;
  public toJsonParser = (app: express.Application) => {
    app.use(express.json());
  };
  public preFlight = (app: express.Application) => {
    app.use(cors());
  };
  public dataBaseConnect = async () => {
    return await DatabaseConnection.connectDB();
  };
  public errorMiddlware = async (app: express.Application) => {
    app.use(this.errorHandlingMiddleware);
  };
  public httpLogger = (app: express.Application) => {
    app.use(this.margonHttpLogger);
  };
  public requestLimiter = (app: Application) => {
    app.use(this.limiter);
  };
}

export default Kernel;
