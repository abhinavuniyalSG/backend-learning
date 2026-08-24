import type { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveNameFromUsers1787585803083 implements MigrationInterface {
  name = "RemoveNameFromUsers1787585803083";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP COLUMN "reviewer_name"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD "reviewer_name" character varying NOT NULL`,
    );
  }
}
