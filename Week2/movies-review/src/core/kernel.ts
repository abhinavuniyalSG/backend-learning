import express from "express";
import cors from "cors";
import { DatabaseConnection } from "../database/dbConnection.js";
import { ErrorMiddleware } from "../middleware/errorHandling.middleware.js";

class kernel {
  private errorHandlingMiddleware = ErrorMiddleware.middleware;
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
}

export default kernel;
