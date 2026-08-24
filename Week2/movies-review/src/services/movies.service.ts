import type { UUID } from "node:crypto";
import type { MovieGenre } from "../database/models/movies.model.js";
import { MoviesRepository } from "../database/repository/movies.repository.js";
import { HttpError } from "../utils/httpError.utils.js";

interface CreateMovieInput {
  title: string;
  director: string;
  genre: MovieGenre;
  release_year: number;
}

interface GetMoviesFilters extends CreateMovieInput {
  id: string;
}

interface UpdateMovieInput {
  title?: string;
  director?: string;
  genre?: MovieGenre;
  release_year?: number;
}

interface Review {
  id: UUID;
  rating: number;
  comment: string;
}
interface Movie {
  id: string;
  title: string;
  director: string;
  genre: string;
  release_year: number;
  reviews: Array<Review>;
}
interface MovieWithAverage extends Movie {
  averageRating: number | null;
}

export class MoviesService {
  private static moviesRepostry = MoviesRepository;
  public static createMovieService = async (
    data: CreateMovieInput,
    userId: string,
  ) => {
    const found = await this.moviesRepostry.findByTitle(
      data.title,
      data.director,
    );
    if (found) {
      throw new HttpError(409, "Movie already exist");
    }
    return this.moviesRepostry.repository.save({
      ...data,
      user: { id: userId },
    });
  };

  public static getMovies = async (filters: GetMoviesFilters) => {
    let result: any;
    const cleanedFilters: any = {};
    let minAverageRatingFilter = null;
    const validFilter = ["id", "title", "director", "genre", "year_filter"];
    for (const [key, value] of Object.entries(filters)) {
      if (key === "release_year") {
        cleanedFilters[key] = value;
        if (!("year_filter" in filters)) {
          cleanedFilters["year_filter"] = "=";
        }
      } else if (key === "min_average_rating") {
        minAverageRatingFilter = value;
      } else if (validFilter.find((item) => item === key)) {
        cleanedFilters[key] = value;
      }
    }

    if (Object.keys(cleanedFilters).length === 0) {
      result = await this.moviesRepostry.getAllMovies();
    } else {
      result = await this.moviesRepostry.getMoviesWithFilters(cleanedFilters);
    }

    if (result.length === 0) {
      return {
        data: result,
        message: "No Movies",
      };
    }
    result = result.map((movie: Movie) => {
      if (movie.reviews.length > 0) {
        const average =
          movie.reviews.reduce(
            (acc: number, review: Review) => acc + review.rating,
            0,
          ) / movie.reviews.length;
        return { ...movie, averageRating: average };
      }
      return { ...movie, averageRating: null };
    });
    if (minAverageRatingFilter !== null) {
      result = result.filter(
        (movie: MovieWithAverage) =>
          movie.averageRating !== null &&
          movie.averageRating >= minAverageRatingFilter,
      );
    }
    return {
      message: "Found",
      count: result.length,
      data: result,
    };
  };
  public static getMovieDetails = async (input: { id: string }) => {
    const movie = await this.moviesRepostry.findById(input.id);
    const movieDetails = movie?.[0];

    if (!movieDetails) {
      throw new HttpError(404, "Movie not found");
    }
    const average =
      movieDetails.reviews.reduce(
        (acc: number, review: any) => acc + review.rating,
        0,
      ) / movieDetails.reviews.length || null;
    const movieWithAverage = { ...movieDetails, averageRating: average };
    return {
      message: "Found",
      data: [movieWithAverage],
    };
  };

  public static deleteMovieService = async (input: {
    id: string;
    user: { [key: string]: any };
  }) => {
    const movie = await this.moviesRepostry.findById(input.id);
    if (!movie[0]) {
      throw new HttpError(404, "Movie not found");
    }
    if (movie[0]?.user?.id !== input.user.id && input.user.role !== "admin") {
      throw new HttpError(403, "authenticated but not permitted");
    }
    const result = await this.moviesRepostry.deleteById(input.id);

    if (!result.affected) {
      throw new HttpError(404, "Movie not found");
    }
  };

  public static updateMovieService = async (input: {
    id: string;
    updates: any;
    user: { [key: string]: any };
  }) => {
    const validFields = ["title", "director", "genre", "release_year"];
    const cleanedUpdates = Object.fromEntries(
      Object.entries(input.updates).filter(([key]) =>
        validFields.includes(key),
      ),
    ) as UpdateMovieInput;

    if (Object.keys(cleanedUpdates).length === 0) {
      throw new HttpError(400, "No valid fields provided for update");
    }
    const movie = await this.moviesRepostry.findById(input.id);
    if (!movie[0]) {
      throw new HttpError(404, "Movie not found");
    }
    if (movie[0]?.user?.id !== input.user.id) {
      throw new HttpError(403, "authenticated but not permitted");
    }
    const result = await this.moviesRepostry.updateById(
      input.id,
      cleanedUpdates,
    );

    if (!result.affected) {
      throw new HttpError(404, "Movie not found");
    }
    return { message: "update success", result };
  };
}
