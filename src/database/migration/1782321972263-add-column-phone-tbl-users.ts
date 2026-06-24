import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnPhoneTblUsers1782321972263 implements MigrationInterface {
  name = 'AddColumnPhoneTblUsers1782321972263';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phone" varchar(20) NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
  }
}
