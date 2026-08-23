import express from "express";
import cors from "cors";
import { DatabaseConnection } from "../database/dbConnection.js";
import { ErrorMiddleware } from "../middleware/errorHandling.middleware.js";
import { RequestLoggerMiddleware } from "../middleware/requestLogger.middleware.js";

class kernel {
  private errorHandlingMiddleware = ErrorMiddleware.middleware;
  private margonHttpLogger = RequestLoggerMiddleware.requestLogger;
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
}

export default kernel;
