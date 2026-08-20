import express from "express";
import { moviesController } from "../controllers/movies.contoller.js";
import { requestValidator } from "../middleware/requestValidator.middleware.js";
import { movieCreationSchema } from "../validator/movies.validator.js";
class moviesRoute {
  public router = express.Router();
  private moviesController = new moviesController();
  private validator = requestValidator.validate;
  private initializeRoutes() {
    this.router.get("/movie", this.moviesController.getMoviesController);
    this.router.post(
      "/movie",
      this.validator("body", movieCreationSchema),
      this.moviesController.createMovieController,
    );
    this.router.get(
      "/movie/:id",
      this.moviesController.getMovieDetailsController,
    );
    this.router.delete(
      "/movie/:id",
      this.moviesController.deleteMovieController,
    );
  }
  constructor() {
    this.initializeRoutes();
  }
}
export default new moviesRoute().router;
