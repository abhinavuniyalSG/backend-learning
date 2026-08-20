import { AppDataSource } from "../dbConnection.js";
import { Reviews } from "../models/reviews.model.js";

export class ReviewsRepository {
  public static repository = AppDataSource.getRepository(Reviews);
}
