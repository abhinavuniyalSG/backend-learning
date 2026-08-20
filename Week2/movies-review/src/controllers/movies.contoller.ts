import { logger } from "../core/logger.js";
import type { NextFunction, Request, Response } from "express";
import { MoviesService } from "../services/movies.service.js";
import { HttpError } from "../utils/httpError.utils.js";

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

  public getMovieDetailsController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const input = req.params as any;
    const result = await MoviesService.getMovieDetails(input);
    res.status(200).json({ ...result });
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

  public deleteMovieController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.params.id as string;
      await this.moviesService.deleteMovieService({ id });
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  };

  public updateMovieController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.params.id as string;
      await this.moviesService.updateMovieService({ id, updates: req.body });
      res.status(200).json("movie updated");
    } catch (error: any) {
      next(error);
    }
  };
}
