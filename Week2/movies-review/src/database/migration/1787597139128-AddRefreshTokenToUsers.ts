import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshTokenToUsers1787597139128 implements MigrationInterface {
    name = 'AddRefreshTokenToUsers1787597139128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_2e5b50f4b7c081eceea476ad128" UNIQUE ("mail")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_2e5b50f4b7c081eceea476ad128"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
    }

}
