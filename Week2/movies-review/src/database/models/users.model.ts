import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { Movies } from "./movies.model.js";
import { Reviews } from "./reviews.model.js";

@Entity()
export class Users {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  mail!: string;

  @Column({ type: "varchar" })
  role!: string;

  @Column({ type: "varchar" })
  password!: string;

  @OneToMany(() => Movies, (movie) => movie.user)
  movies!: Movies[];

  @OneToMany(() => Reviews, (review) => review.user)
  reviews!: Reviews[];
}
