import { MoviesRepository } from "../database/repository/movies.repository.js";
import { ReviewsRepository } from "../database/repository/reviews.repository.js";
import { HttpError } from "../utils/httpError.utils.js";

interface CreateReviewInput {
  reviewer_name: string;
  rating: number;
  comment: string;
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
      movie_id: movie.id,
    });

    return {
      id: review.id,
      movie_id: movieId,
      reviewer_name: review.reviewer_name,
      rating: review.rating,
      comment: review.comment,
    };
  };
}
