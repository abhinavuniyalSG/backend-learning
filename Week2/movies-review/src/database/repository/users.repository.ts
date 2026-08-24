import { AppDataSource } from "../dbConnection.js";
import { Users } from "../models/users.model.js";

export class UsersRepository {
  public static repository = AppDataSource.getRepository(Users);

  public static findByMail = (mail: string) =>
    this.repository
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.mail = :mail", { mail })
      .getOne();

  public static createUser = (user: Partial<Users>) =>
    this.repository.save(user);

  public static findById = (id: string) => this.repository.findOneBy({ id });
}
