import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOwnerTableMigration1754977738078 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS owner (
                uid VARCHAR(36) NOT NULL UNIQUE,
                name VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                PRIMARY KEY (uid)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS owner;
        `);
    }

}
