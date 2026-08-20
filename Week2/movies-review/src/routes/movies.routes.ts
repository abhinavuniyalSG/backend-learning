import express from "express";
import { moviesController } from "../controllers/movies.contoller.js";
import { requestValidator } from "../middleware/requestValidator.middleware.js";
import {
  idSchema,
  movieCreationSchema,
  movieQuerySchema,
  movieUpdateSchema,
} from "../validator/movies.validator.js";
class moviesRoute {
  public router = express.Router();
  private moviesController = new moviesController();
  private validator = requestValidator.validate;
  private initializeRoutes() {
    this.router.get(
      "/movie",
      this.validator("query", movieQuerySchema),
      this.moviesController.getMoviesController,
    );
    this.router.post(
      "/movie",
      this.validator("body", movieCreationSchema),
      this.moviesController.createMovieController,
    );
    this.router.get(
      "/movie/:id",
      this.validator("params", idSchema),
      this.moviesController.getMovieDetailsController,
    );
    this.router.delete(
      "/movie/:id",
      this.validator("params", idSchema),
      this.moviesController.deleteMovieController,
    );
    this.router.patch(
      "/movie/:id",
      this.validator("params", idSchema),
      this.validator("body", movieUpdateSchema),
      this.moviesController.updateMovieController,
    );
  }
  constructor() {
    this.initializeRoutes();
  }
}
export default new moviesRoute().router;
