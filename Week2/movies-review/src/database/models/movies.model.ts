import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Reviews } from "./reviews.model.js";

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
}
