import {
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
} from "typeorm";
import { AppDataSource } from "../dbConnection.js";
import { Reviews } from "../models/reviews.model.js";

export class ReviewsRepository {
  public static repository = AppDataSource.getRepository(Reviews);

  public static findByMovieId = (movieId: string) =>
    this.repository.find({
      where: {
        movie: { id: movieId },
      },
      relations: {
        movie: true,
        user: true,
      },
    });

  public static findByMovieIdAndFilters = (
    movieId: string,
    filters: Record<string, string | number | undefined>,
  ) => {
    const where: Record<string, any> = {
      movie: { id: movieId },
    };

    if (filters.rating !== undefined) {
      const ratingFilter = filters.rating_filter ?? "=";

      const rating =
        ratingFilter === "="
          ? filters.rating
          : ratingFilter === ">"
            ? MoreThan(filters.rating)
            : ratingFilter === "<"
              ? LessThan(filters.rating)
              : ratingFilter === ">="
                ? MoreThanOrEqual(filters.rating)
                : ratingFilter === "<="
                  ? LessThanOrEqual(filters.rating)
                  : filters.rating;

      where.rating = rating;
    }

    return this.repository.find({
      where,
      relations: {
        movie: true,
        user: true,
      },
    });
  };

  public static findReviewById = async (movieId: string, reviewId: string) =>
    await this.repository.find({
      where: { id: reviewId, movie: { id: movieId } },
      relations: {
        movie: true,
        user: true,
      },
    });
  public static updateReviewById = async (
    movieId: string,
    reviewId: string,
    updates: Partial<Reviews>,
  ) =>
    await this.repository.update(
      {
        id: reviewId,
        movie: { id: movieId },
      },
      updates,
    );
  public static deleteReviewById = async (movieId: string, reviewId: string) =>
    await this.repository.delete({
      id: reviewId,
      movie: { id: movieId },
    });

  public static findAllReviewsRating = async (movieId: string) =>
    await this.repository
      .createQueryBuilder("reviews")
      .select("AVG(reviews.rating)", "averageRating")
      .where("reviews.movie = :movieId", { movieId })
      .getRawOne();
}
