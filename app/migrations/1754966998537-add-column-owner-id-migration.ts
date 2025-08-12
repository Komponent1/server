import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnDemoIdMigration1754966998537 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE staff
            ADD COLUMN ownerId VARCHAR(36) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE nail
            ADD COLUMN ownerId VARCHAR(36) NOT NULL
            
        `);
        await queryRunner.query(`
            ALTER TABLE reservation
            ADD COLUMN ownerId VARCHAR(36) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE staff
            DROP COLUMN ownerId
        `);
        await queryRunner.query(`
            ALTER TABLE nail
            DROP COLUMN ownerId
        `);
        await queryRunner.query(`
            ALTER TABLE reservation
            DROP COLUMN ownerId
        `);
    }

}
