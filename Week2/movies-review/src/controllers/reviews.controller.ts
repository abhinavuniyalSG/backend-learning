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
        rating: number;
        comment: string;
      };
      const userId = req.user?.id;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      const review = await ReviewsService.createReview(movieId, body, userId);

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

  public updateReviewController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { movieId, reviewId } = (req.validated?.params ?? req.params) as {
        movieId: string;
        reviewId: string;
      };
      const user = req.user;
      if (!user?.id) {
        throw new Error("User not authenticated");
      }
      const updatedReview = await ReviewsService.updateReview(
        movieId,
        reviewId,
        user,
        req.validated?.body as {
          rating?: number;
          comment?: string;
        },
      );

      res.status(200).json(updatedReview);
    } catch (error) {
      next(error);
    }
  };

  public averageRatingController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { movieId } = (req.validated?.params ?? req.params) as {
        movieId: string;
      };
      const result = await ReviewsService.findAverageReview(movieId);
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
      const user = req.user;
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      await ReviewsService.deleteReview(movieId, reviewId, user);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
