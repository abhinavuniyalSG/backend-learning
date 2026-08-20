import { logger } from "../core/logger.js";
import type { NextFunction, Request, Response } from "express";
import { MoviesService } from "../services/movies.service.js";

export class moviesController {
  private moviesService = MoviesService;
  public getMoviesController = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    logger.info("Movies route is working fine");
    res.status(200).json({ message: "Movies route is working fine" });
  };
  public createMovieController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      await this.moviesService.createMovieService(req.body);
      logger.info("create. movies route");
      res.status(201).json("movie created");
    } catch (error: any) {
      next(error);
    }
  };
}
