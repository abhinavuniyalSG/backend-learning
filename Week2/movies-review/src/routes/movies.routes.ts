import express from "express";
import { moviesController } from "../controllers/movies.contoller.js";
class moviesRoute {
  public router: express.Router = express.Router();
  private moviesController: moviesController = new moviesController();
  private initializeRoutes() {
    this.router.get("/movies", this.moviesController.getMoviesController);
  }
  constructor() {
    this.initializeRoutes();
  }
}
export default new moviesRoute().router;
