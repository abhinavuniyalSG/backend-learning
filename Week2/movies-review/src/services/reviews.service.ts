import { MoviesRepository } from "../database/repository/movies.repository.js";
import { ReviewsRepository } from "../database/repository/reviews.repository.js";
import { HttpError } from "../utils/httpError.utils.js";

interface CreateReviewInput {
  reviewer_name: string;
  rating: number;
  comment: string;
}
interface filterInput {
  [key: string]: string | number | undefined;
}
export class ReviewsService {
  public static createReview = async (
    movieId: string,
    reviewData: CreateReviewInput,
  ) => {
    const movie = await MoviesRepository.findById(movieId);
    if (!movie) {
      throw new HttpError(404, "Movie not found");
    }

    const review = await ReviewsRepository.repository.save({
      ...reviewData,
      movie: { id: movieId },
    });

    return {
      id: review.id,
      movie_id: movieId,
      reviewer_name: review.reviewer_name,
      rating: review.rating,
      comment: review.comment,
    };
  };

  public static getReviews = async (movieId: string, filters: filterInput) => {
    const movie = await MoviesRepository.findById(movieId);

    if (!movie) {
      throw new HttpError(404, "Movie not found");
    }

    const cleanedFilters: filterInput = {};
    const validKeys = ["reviewer_name", "rating", "rating_filter"];

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
    if (!movie) {
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

  public static deleteReview = async (movieId: string, Id: string) => {
    const movie = await MoviesRepository.findById(movieId);
    if (!movie) {
      throw new HttpError(404, "Movie not found");
    }
    const reviewDetail = await ReviewsRepository.deleteReviewById(movieId, Id);
    if (reviewDetail.affected === 0) {
      throw new HttpError(404, "Review not found");
    }
    return {
      message: "deleted",
    };
  };
}
