import { QueryRunner } from 'typeorm';

export class initTableMigration {
  name = 'init-table-migration';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS User (
        uid INT AUTO_INCREMENT PRIMARY KEY,
        nickname VARCHAR(255) NOT
         NULL,
        pw TEXT,
      );
    `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
      DROP TABLE IF EXISTS game;
    `);
  }
}
