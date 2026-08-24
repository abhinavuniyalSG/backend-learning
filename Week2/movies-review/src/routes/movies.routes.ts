import express from "express";
import { MoviesController } from "../controllers/movies.contoller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { requestValidator } from "../middleware/requestValidator.middleware.js";
import {
  idSchema,
  movieCreationSchema,
  movieQuerySchema,
  movieUpdateSchema,
} from "../validator/movies.validator.js";
class moviesRoute {
  public router = express.Router();
  private moviesController = new MoviesController();
  private validator = requestValidator.validate;
  private initializeRoutes() {
    this.router.get(
      "/movies",
      this.validator("query", movieQuerySchema),
      this.moviesController.getMoviesController,
    );
    this.router.post(
      "/movies",
      authMiddleware,
      this.validator("body", movieCreationSchema),
      this.moviesController.createMovieController,
    );
    this.router.get(
      "/movies/:id",
      this.validator("params", idSchema),
      this.moviesController.getMovieDetailsController,
    );
    this.router.delete(
      "/movies/:id",
      authMiddleware,
      this.validator("params", idSchema),
      this.moviesController.deleteMovieController,
    );
    this.router.patch(
      "/movies/:id",
      authMiddleware,
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
