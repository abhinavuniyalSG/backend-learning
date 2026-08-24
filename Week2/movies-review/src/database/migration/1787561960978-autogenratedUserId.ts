import type { MigrationInterface, QueryRunner } from "typeorm";

export class AutogenratedUserId1787561960978 implements MigrationInterface {
  name = "AutogenratedUserId1787561960978";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_reviews_user_1788000000000"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies" DROP CONSTRAINT "FK_movies_user_1788000000000"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "role" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies" ADD CONSTRAINT "FK_b16396310081b89594a4f2f2890" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movies" DROP CONSTRAINT "FK_b16396310081b89594a4f2f2890"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    await queryRunner.query(
      `ALTER TABLE "movies" ADD CONSTRAINT "FK_movies_user_1788000000000" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_reviews_user_1788000000000" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
