import { logger } from "../core/logger.js";
import type { Request, Response } from "express";

export class moviesController {
  public getMoviesController = (req: Request, res: Response) => {
    logger.info("Movies route is working fine");
    res.status(200).json({ message: "Movies route is working fine" });
  };
  public createMovieController = async (req: Request, res: Response) => {
    try {
      logger.info("create. movies route");
      res.status(201).json("movie created");
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json(error.message || "Internal server Error ");
    }
  };
}
