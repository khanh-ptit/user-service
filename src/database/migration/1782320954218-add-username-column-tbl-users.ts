import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsernameColumnTblUsers1782320954218
  implements MigrationInterface
{
  name = 'AddUsernameColumnTblUsers1782320954218';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "username" character varying NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
  }
}
