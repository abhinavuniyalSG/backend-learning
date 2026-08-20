import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}
