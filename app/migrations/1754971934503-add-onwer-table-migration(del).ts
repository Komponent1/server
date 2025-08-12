import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOnwerTableMigation1754971934503 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS owner (
                id VARCHAR(36) DEFAULT (UUID()) PRIMARY KEY,
                uid VARCHAR(36) NOT NULL UNIQUE,
                name VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS owner;
        `);
    }

}
