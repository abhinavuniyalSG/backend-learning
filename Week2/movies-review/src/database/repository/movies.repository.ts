import { AppDataSource } from "../dbConnection.js";
import { Movies } from "../models/movies.model.js";

export class MoviesRepository {
  public static repository = AppDataSource.getRepository(Movies);

  public static findByTitle = (title: string) =>
    this.repository.findOne({ where: { title } });
}
