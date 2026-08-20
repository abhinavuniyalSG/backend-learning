import express from "express";
import { moviesController } from "../controllers/movies.contoller.js";
import { logger } from "../core/logger.js";
import { requestValidator } from "../middleware/requestValidator.middleware.js";
import { moviesSchema } from "../validator/movies.validator.js";
class moviesRoute {
  public router = express.Router();
  private moviesController = new moviesController();
  private validator = requestValidator.validate;
  private initializeRoutes() {
    this.router.get("/movie", this.moviesController.getMoviesController);
    this.router.post(
      "/movie",
      this.validator("body", moviesSchema),
      this.moviesController.createMovieController,
    );
  }
  constructor() {
    this.initializeRoutes();
  }
}
export default new moviesRoute().router;
