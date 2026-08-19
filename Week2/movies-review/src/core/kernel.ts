import express from "express";
import cors from "cors";
import { DatabaseConnection } from "../database/dbConnection.js";

class kernel {
  public toJsonParser = (app: express.Application) => {
    app.use(express.json());
  };
  public preFlight = (app: express.Application) => {
    app.use(cors());
  };
  public dataBaseConnect = async () => {
    return await DatabaseConnection.connectDB();
  };
}

export default kernel;
