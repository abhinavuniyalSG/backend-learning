import {
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
} from "typeorm";
import { AppDataSource } from "../dbConnection.js";
import { Movies } from "../models/movies.model.js";
import { ReviewsRepository } from "./reviews.repository.js";

export class MoviesRepository {
  public static repository = AppDataSource.getRepository(Movies);

  public static findByTitle = (title: string) =>
    this.repository.findOneBy({ title: title });

  public static getAllMovies = () =>
    this.repository.find({
      relations: {
        reviews: true,
      },
    });
  public static getMoviesWithFilters = async (filters: any) => {
    if ("year_filter" in filters) {
      const year =
        filters.year_filter === "="
          ? filters.release_year
          : filters.year_filter === ">"
            ? MoreThan(filters.release_year)
            : filters.year_filter === "<"
              ? LessThan(filters.release_year)
              : filters.year_filter === ">="
                ? MoreThanOrEqual(filters.release_year)
                : filters.year_filter === "<="
                  ? LessThanOrEqual(filters.release_year)
                  : filters.release_year;
      filters = { ...filters, release_year: year };
      delete filters.year_filter;
    }
    if ("title" in filters) {
      filters.title = Like(`%${filters.title}%`);
    }
    if ("director" in filters) {
      filters.director = Like(`%${filters.director}%`);
    }
    return this.repository.find({
      where: filters,
      relations: {
        reviews: true,
      },
    });
  };
  public static findById = (id: string) =>
    this.repository.find({
      where: { id },
      relations: {
        reviews: true,
      },
    });

  public static deleteById = (id: string) => this.repository.delete({ id });

  public static updateById = (
    id: string,
    updates: Partial<Omit<Movies, "id">>,
  ) => this.repository.update({ id }, updates);
}
