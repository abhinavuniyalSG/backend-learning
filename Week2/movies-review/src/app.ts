import "reflect-metadata";
import express from "express";
import kernel from "./core/kernel.js";
import routes from "./routes/index.js";
import { logger } from "./core/logger.js";
import { registerSwagger } from "./docs/swagger.js";

class App {
  private kernel: kernel = new kernel();
  private routes: routes = new routes();
  public app: express.Application = express();
  public async initializeMiddlewares(): Promise<void> {
    await this.kernel.dataBaseConnect();
    this.kernel.requestLimiter(this.app);
    this.kernel.toJsonParser(this.app);
    this.kernel.preFlight(this.app);
    this.kernel.httpLogger(this.app);
    registerSwagger(this.app);
    this.routes.routes(this.app);
    this.kernel.errorMiddlware(this.app);
  }

  constructor() {
    this.initializeMiddlewares().catch((error) => {
      logger.error("Encounter error while starting server closing server!!!");
      process.exit(1);
    });
  }
}

export default new App().app;
