import { MoviesRepository } from "../database/repository/movies.repository.js";
import { ReviewsRepository } from "../database/repository/reviews.repository.js";
import { HttpError } from "../utils/httpError.utils.js";

interface CreateReviewInput {
  rating: number;
  comment: string;
}
interface filterInput {
  [key: string]: string | number | undefined;
}

interface UpdateReviewInput {
  rating?: number;
  comment?: string;
}
export class ReviewsService {
  public static createReview = async (
    movieId: string,
    reviewData: CreateReviewInput,
    userId: string,
  ) => {
    const movie = await MoviesRepository.findById(movieId);
    if (!movie?.[0]) {
      throw new HttpError(404, "Movie not found");
    }

    const review = await ReviewsRepository.repository.save({
      ...reviewData,
      movie: { id: movieId },
      user: { id: userId },
    });

    return {
      id: review.id,
      movie_id: movieId,
      rating: review.rating,
      comment: review.comment,
    };
  };

  public static getReviews = async (movieId: string, filters: filterInput) => {
    const movie = await MoviesRepository.findById(movieId);

    if (!movie?.[0]) {
      throw new HttpError(404, "Movie not found");
    }

    const cleanedFilters: filterInput = {};
    const validKeys = ["rating", "rating_filter"];

    for (const [key, value] of Object.entries(filters)) {
      if (validKeys.includes(key)) {
        cleanedFilters[key] = value;
      }
    }

    const result =
      Object.keys(cleanedFilters).length === 0
        ? await ReviewsRepository.findByMovieId(movieId)
        : await ReviewsRepository.findByMovieIdAndFilters(
            movieId,
            cleanedFilters,
          );

    if (result.length === 0) {
      return {
        message: "No Reviews",
        data: [],
      };
    }

    return {
      message: "Found",
      count: result.length,
      data: result,
    };
  };

  public static getReviewDetail = async (movieId: string, reviewId: string) => {
    const movie = await MoviesRepository.findById(movieId);
    if (!movie?.[0]) {
      throw new HttpError(404, "Movie not found");
    }
    const reviewDetail = await ReviewsRepository.findReviewById(
      movieId,
      reviewId,
    );
    if (reviewDetail.length === 0) {
      throw new HttpError(404, "Review not found");
    }
    return {
      message: "found",
      data: reviewDetail[0],
    };
  };

  public static updateReview = async (
    movieId: string,
    reviewId: string,
    user: { [key: string]: any },
    reviewData: UpdateReviewInput,
  ) => {
    const movie = await MoviesRepository.findById(movieId);
    if (!movie?.[0]) {
      throw new HttpError(404, "Movie not found");
    }

    const review = await ReviewsRepository.findReviewById(movieId, reviewId);
    if (review.length === 0) {
      throw new HttpError(404, "Review not found");
    }
    if (review[0]?.user?.id !== user.id) {
      throw new HttpError(403, "authenticated but not permitted");
    }

    const updates = Object.fromEntries(
      Object.entries(reviewData).filter(([, value]) => value !== undefined),
    ) as UpdateReviewInput;

    if (Object.keys(updates).length === 0) {
      throw new HttpError(400, "At least one field is required for update");
    }

    const result = await ReviewsRepository.updateReviewById(
      movieId,
      reviewId,
      updates,
    );

    if (result.affected === 0) {
      throw new HttpError(404, "Review not found");
    }
    return {
      message: "Updated review",
      id: reviewId,
      movie_id: movieId,
    };
  };

  public static deleteReview = async (
    movieId: string,
    Id: string,
    user: { [key: string]: any },
  ) => {
    const movie = await MoviesRepository.findById(movieId);

    if (!movie[0]) {
      throw new HttpError(404, "Movie not found");
    }
    const review = await ReviewsRepository.findReviewById(movieId, Id);
    if (!review[0]) {
      throw new HttpError(404, "Review not found");
    }
    if (review[0].user?.id !== user.id && user.role !== "admin") {
      throw new HttpError(403, "authenticated but not permitted");
    }
    const reviewDetail = await ReviewsRepository.deleteReviewById(movieId, Id);
    if (reviewDetail.affected === 0) {
      throw new HttpError(404, "Review not found");
    }
    return {
      message: "deleted",
    };
  };

  public static findAverageReview = async (movieId: string) => {
    const movie = await MoviesRepository.findById(movieId);
    if (!movie?.[0]) {
      throw new HttpError(404, "Movie not found");
    }
    const data = await ReviewsRepository.findAllReviewsRating(movieId);

    return data;
  };
}
