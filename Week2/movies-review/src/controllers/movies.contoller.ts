import { logger } from "../core/logger.js";
import type { Request, Response } from "express";
import { MoviesService } from "../services/movies.service.js";

export class moviesController {
  private moviesService = MoviesService;
  public getMoviesController = (req: Request, res: Response) => {
    logger.info("Movies route is working fine");
    res.status(200).json({ message: "Movies route is working fine" });
  };
  public createMovieController = async (req: Request, res: Response) => {
    try {
      await this.moviesService.createMovieService(req.body);
      logger.info("create. movies route");
      res.status(201).json("movie created");
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json(error.message || "Internal server Error ");
    }
  };
}
