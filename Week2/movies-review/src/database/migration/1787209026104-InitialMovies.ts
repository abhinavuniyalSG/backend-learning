import type { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMovies1787209026104 implements MigrationInterface {
  name = "InitialMovies1787209026104";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."movies_genre_enum" AS ENUM('Sci-Fi', 'Action', 'Crime', 'Drama', 'Thriller', 'Animation')`,
    );
    await queryRunner.query(
      `CREATE TABLE "movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "director" character varying NOT NULL, "genre" "public"."movies_genre_enum" NOT NULL, "year" integer NOT NULL, CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "movies"`);
    await queryRunner.query(`DROP TYPE "public"."movies_genre_enum"`);
  }
}
