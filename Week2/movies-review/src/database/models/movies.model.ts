import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

enum MovieGenre {
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

  @Column()
  title!: string;

  @Column()
  director!: string;

  @Column({
    type: "enum",
    enum: MovieGenre,
  })
  genre!: MovieGenre;

  @Column()
  year!: number;
}
