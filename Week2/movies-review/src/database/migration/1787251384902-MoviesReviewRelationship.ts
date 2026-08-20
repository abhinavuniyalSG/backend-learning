import type { MigrationInterface, QueryRunner } from "typeorm";

export class MoviesReviewRelationship1787251384902 implements MigrationInterface {
  name = "MoviesReviewRelationship1787251384902";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reviews" ADD "movie_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_563501cf3faa75a1ca40be84f82" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_563501cf3faa75a1ca40be84f82"`,
    );
    await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "movie_id"`);
  }
}
