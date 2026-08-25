import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Movies } from "./movies.model.js";
import { Reviews } from "./reviews.model.js";

@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar", unique: true })
  mail!: string;

  @Column({ type: "varchar" })
  role!: string;

  @Column({ type: "varchar", select: false })
  password!: string;

  @Column({ type: "varchar", nullable: true, select: false })
  refreshToken!: string | null;

  @OneToMany(() => Movies, (movie) => movie.user)
  movies!: Movies[];

  @OneToMany(() => Reviews, (review) => review.user)
  reviews!: Reviews[];
}
