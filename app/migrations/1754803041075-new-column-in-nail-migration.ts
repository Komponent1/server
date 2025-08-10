import { MigrationInterface, QueryRunner } from "typeorm";

export class NewColumnInNailMigration1754803041075 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE nail
            ADD COLUMN spendMinute integer NOT NULL DEFAULT 60
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE nail
            DROP COLUMN spendMinute;
        `);
    }

}
