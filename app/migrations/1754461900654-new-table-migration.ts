import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewTable1754461900654 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS staff (
                id VARCHAR(36) DEFAULT (UUID()) PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );
        `);
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS nail (
                id VARCHAR(36) DEFAULT (UUID()) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL
            );
        `);
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS reservation (
                id VARCHAR(36) DEFAULT (UUID()) PRIMARY KEY,
                date VARCHAR(255) NOT NULL,
                createAt VARCHAR(255) NOT NULL,
                phone VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                staffId VARCHAR(36),
                nailId VARCHAR(36),
                FOREIGN KEY (staffId) REFERENCES staff(id) ON DELETE CASCADE,
                FOREIGN KEY (nailId) REFERENCES nail(id) ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS staff;
        `);
    await queryRunner.query(`
            DROP TABLE IF EXISTS nail;
        `);
    await queryRunner.query(`
            DROP TABLE IF EXISTS reservation;
        `);
  }
}
