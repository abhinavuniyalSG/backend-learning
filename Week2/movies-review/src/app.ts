import express from "express";
import kernel from "./core/kernel.js";

class App {
  public app: express.Application = express();
  private kernel: kernel = new kernel();
  private initializeMiddlewares() {
    this.kernel.toJsonParser(this.app);
    this.kernel.preFlight(this.app);
  }

  constructor() {
    this.initializeMiddlewares();
  }
}

export default new App().app;
