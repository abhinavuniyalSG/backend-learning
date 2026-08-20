import type { MigrationInterface, QueryRunner } from "typeorm";

export class InitialReviews1787253574650 implements MigrationInterface {
  name = "InitialReviews1787253574650";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "reviewer_name" character varying NOT NULL, "rating" smallint NOT NULL, "comment" text NOT NULL, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "reviews"`);
  }
}
