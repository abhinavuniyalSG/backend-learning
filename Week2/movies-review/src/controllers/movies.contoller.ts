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
      const filters = req.validated?.query ?? req.query;
      const result = await MoviesService.getMovies(filters as any);
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
    try {
      const input = req.validated?.params ?? req.params;
      const result = await MoviesService.getMovieDetails(input as { id: string });
      res.status(200).json({ ...result });
    } catch (error: any) {
      next(error);
    }
  };

  public createMovieController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const body = req.validated?.body ?? req.body;
      await this.moviesService.createMovieService(body as any);
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
      const params = req.validated?.params ?? req.params;
      const id = (params as { id: string }).id;
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
      const params = req.validated?.params ?? req.params;
      const id = (params as { id: string }).id;
      const updates = req.validated?.body ?? req.body;
      await this.moviesService.updateMovieService({ id, updates });
      res.status(200).json("movie updated");
    } catch (error: any) {
      next(error);
    }
  };
}
