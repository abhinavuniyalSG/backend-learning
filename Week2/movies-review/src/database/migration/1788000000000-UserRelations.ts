import type { MigrationInterface, QueryRunner } from "typeorm";

export class UserRelations1788000000000 implements MigrationInterface {
  name = "UserRelations1788000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "movies" ADD "user_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "movies" ADD CONSTRAINT "FK_movies_user_1788000000000" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "reviews" ADD "user_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_reviews_user_1788000000000" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_reviews_user_1788000000000"`,
    );
    await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "user_id"`);
    await queryRunner.query(
      `ALTER TABLE "movies" DROP CONSTRAINT "FK_movies_user_1788000000000"`,
    );
    await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "user_id"`);
  }
}
