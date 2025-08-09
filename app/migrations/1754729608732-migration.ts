import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1754729608732 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE reservation
            ADD COLUMN startTime DATETIME NOT NULL,
            ADD COLUMN endTime DATETIME NOT NULL,
            DROP COLUMN date
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE reservation
            DROP COLUMN startTime,
            DROP COLUMN endTime
        `);
    }

}
