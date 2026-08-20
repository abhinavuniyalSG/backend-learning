import express from "express";
import { ReviewsController } from "../controllers/reviews.controller.js";
import { requestValidator } from "../middleware/requestValidator.middleware.js";
import {
  movieIdSchema,
  reviewCreationSchema,
} from "../validator/reviews.validator.js";

class ReviewsRoute {
  public router = express.Router();
  private reviewsController = new ReviewsController();
  private validator = requestValidator.validate;

  private initializeRoutes() {
    this.router.post(
      "/:movieId/reviews",
      this.validator("params", movieIdSchema),
      this.validator("body", reviewCreationSchema),
      this.reviewsController.createReviewController,
    );
  }

  constructor() {
    this.initializeRoutes();
  }
}

export default new ReviewsRoute().router;
