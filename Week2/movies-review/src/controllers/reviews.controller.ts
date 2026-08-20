import type { NextFunction, Request, Response } from "express";
import { ReviewsService } from "../services/reviews.service.js";

export class ReviewsController {
  public createReviewController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { movieId } = (req.validated?.params ?? req.params) as {
        movieId: string;
      };
      const body = req.validated?.body as {
        reviewer_name: string;
        rating: number;
        comment: string;
      };
      const review = await ReviewsService.createReview(movieId, body);

      res.status(201).json({ message: "Review created", data: review });
    } catch (error) {
      next(error);
    }
  };
}
