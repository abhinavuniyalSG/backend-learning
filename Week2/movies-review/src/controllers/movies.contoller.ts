import { logger } from "../core/logger.js";
import type { NextFunction, Request, Response } from "express";
import { MoviesService } from "../services/movies.service.js";

export class moviesController {
  private moviesService = MoviesService;
  public getMoviesController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const filters = req.query as any;
      const result = await MoviesService.getMovies(filters);
      res.status(200).json({ ...result });
    } catch (error: any) {
      next(error);
    }
  };

  // public getMovieDetailsController = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ) => {
  //   const input = req.params as any;
  //   const result = await MoviesService.getMovieDetails(input);
  //   res.status(200).json({ ...result });
  // };

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
