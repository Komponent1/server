import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableColumnMigration1754978199116 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE nail
            RENAME COLUMN ownerId TO ownerUid;
        `);
        
        await queryRunner.query(`
            ALTER TABLE staff
            RENAME COLUMN ownerId TO ownerUid;
        `);

        await queryRunner.query(`
            ALTER TABLE reservation
            RENAME COLUMN ownerId TO ownerUid;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE nail
            RENAME COLUMN ownerUid TO ownerId;
        `);

        await queryRunner.query(`
            ALTER TABLE staff
            RENAME COLUMN ownerUid TO ownerId;
        `);

        await queryRunner.query(`
            ALTER TABLE reservation
            RENAME COLUMN ownerUid TO ownerId;
        `);
    }

}
