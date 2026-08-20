import type { MigrationInterface, QueryRunner } from "typeorm";

export class RenameYearToReleaseYear1787216240607 implements MigrationInterface {
  name = "RenameYearToReleaseYear1787216240607";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movies" RENAME COLUMN "year" TO "release_year"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movies" RENAME COLUMN "release_year" TO "year"`,
    );
  }
}
