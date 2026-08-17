import express from "express";
import cors from "cors";

class kernel {
  public toJsonParser = (app: express.Application) => {
    app.use(express.json());
  };
  public preFlight = (app: express.Application) => {
    app.use(cors());
  };
}

export default kernel;
