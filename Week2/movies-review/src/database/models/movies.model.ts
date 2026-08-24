import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Reviews } from "./reviews.model.js";
import { Users } from "./users.model.js";

export enum MovieGenre {
  "Sci-Fi" = "Sci-Fi",
  "Action" = "Action",
  "Crime" = "Crime",
  "Drama" = "Drama",
  "Thriller" = "Thriller",
  "Animation" = "Animation",
}

@Entity()
export class Movies {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  title!: string;

  @Column({ type: "varchar" })
  director!: string;

  @Column({
    type: "enum",
    enum: MovieGenre,
  })
  genre!: MovieGenre;

  @Column({ type: "integer" })
  release_year!: number;

  @OneToMany(() => Reviews, (review) => review.movie)
  reviews!: Reviews[];

  @ManyToOne(() => Users, (user) => user.movies, { onDelete: "SET NULL" })
  @JoinColumn({ name: "user_id" })
  user?: Users;
}
