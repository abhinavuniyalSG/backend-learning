import type { NextFunction, Request, Response } from "express";
import { ReviewsService } from "../services/reviews.service.js";

interface filterInput {
  [key: string]: string | number | undefined;
}
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

  public getReviewsController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { movieId } = (req.validated?.params ?? req.params) as {
        movieId: string;
      };

      const filters = (req.validated?.query ?? req.query) as filterInput;

      const result = await ReviewsService.getReviews(movieId, filters);

      res.status(200).json({ ...result });
    } catch (error) {
      next(error);
    }
  };

  public getReviewDetailContoller = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { movieId, reviewId } = (req.validated?.params ?? req.params) as {
        movieId: string;
        reviewId: string;
      };
      const result = await ReviewsService.getReviewDetail(movieId, reviewId);
      res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  };

  public deleteReviewContoller = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { movieId, reviewId } = (req.validated?.params ?? req.params) as {
        movieId: string;
        reviewId: string;
      };
      const result = await ReviewsService.deleteReview(movieId, reviewId);
      res.status(204).json({ result });
    } catch (error) {
      next(error);
    }
  };
}
