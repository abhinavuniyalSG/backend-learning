import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movies } from "./movies.model.js";

@Entity({ name: "reviews" })
export class Reviews {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  reviewer_name!: string;

  @Column({ type: "smallint" })
  rating!: number;

  @Column({ type: "text" })
  comment!: string;
}
