import { logger } from "../core/logger.js";
import type { Request, Response } from "express";

export class moviesController {
  public getMoviesController = (req: Request, res: Response) => {
    logger.info("Movies route is working fine");
    res.status(200).json({ message: "Movies route is working fine" });
  };
}
