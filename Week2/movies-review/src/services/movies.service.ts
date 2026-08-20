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

export class MoviesService {
  private static moviesRepostry = MoviesRepository;

  public static createMovieService = async (data: CreateMovieInput) => {
    const found = await this.moviesRepostry.findByTitle(data.title);
    if (found) {
      throw new HttpError(409, "Movie already exist");
    }
    return this.moviesRepostry.repository.save(data);
  };

  public static getMovies = async (filters: GetMoviesFilters) => {
    let result: any;
    const cleanedFilters: any = {};
    const validFilter = ["id", "title", "director", "genre", "year_filter"];
    for (const [key, value] of Object.entries(filters)) {
      if (key === "release_year") {
        cleanedFilters[key] = value;
        cleanedFilters["year_filter"] = "=";
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
    return {
      message: "Found also will ignore all invalid filters",
      count: result.length,
      data: result,
    };
  };
  // public static getMovieDetails = async (input: { id: string }) =>
  //   await findById(input.id);
}
