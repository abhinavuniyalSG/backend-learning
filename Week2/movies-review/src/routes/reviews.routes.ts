import express from "express";
import { ReviewsController } from "../controllers/reviews.controller.js";
import { requestValidator } from "../middleware/requestValidator.middleware.js";
import {
  movieIdSchema,
  reviewCreationSchema,
  reviewIdmovieIdSchema,
  reviewQuerySchema,
  reviewUpdateSchema,
} from "../validator/reviews.validator.js";

class ReviewsRoute {
  public router = express.Router();
  private reviewsController = new ReviewsController();
  private validator = requestValidator.validate;

  private initializeRoutes() {
    this.router.get(
      "/:movieId/reviews",
      this.validator("params", movieIdSchema),
      this.validator("query", reviewQuerySchema),
      this.reviewsController.getReviewsController,
    );
    this.router.post(
      "/:movieId/reviews",
      this.validator("params", movieIdSchema),
      this.validator("body", reviewCreationSchema),
      this.reviewsController.createReviewController,
    );
    this.router.get(
      "/:movieId/reviews/averageRating",
      this.validator("params", movieIdSchema),
      this.reviewsController.averageRatingController,
    );
    this.router.get(
      "/:movieId/reviews/:reviewId",
      this.validator("params", reviewIdmovieIdSchema),
      this.reviewsController.getReviewDetailContoller,
    );
    this.router.delete(
      "/:movieId/reviews/:reviewId",
      this.validator("params", reviewIdmovieIdSchema),
      this.reviewsController.deleteReviewContoller,
    );

    this.router.patch(
      "/:movieId/reviews/:reviewId",
      this.validator("params", reviewIdmovieIdSchema),
      this.validator("body", reviewUpdateSchema),
      this.reviewsController.updateReviewController,
    );
  }

  constructor() {
    this.initializeRoutes();
  }
}

export default new ReviewsRoute().router;
