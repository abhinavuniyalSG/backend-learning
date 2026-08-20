import type { MovieGenre } from "../database/models/movies.model.js";
import { MoviesRepository } from "../database/repository/movies.repository.js";
import { HttpError } from "../utils/httpError.utils.js";
interface createInput {
  title: string;
  director: string;
  genre: MovieGenre;
  release_year: number;
}
export class MoviesService {
  private static moviesRepostry = MoviesRepository;

  public static createMovieService = async (data: createInput) => {
    const found = await this.moviesRepostry.findByTitle(data.title);
    if (found) {
      return new HttpError(409, "Movie already exist");
    }
    return this.moviesRepostry.repository.save(data);
  };
}
