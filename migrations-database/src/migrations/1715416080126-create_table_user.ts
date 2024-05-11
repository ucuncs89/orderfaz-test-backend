import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUser1715416080126 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isUnique: true,
            generationStrategy: "uuid",
            default: `uuid_generate_v4()`,
          },
          {
            name: "username",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "msisdn",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "password",
            type: "text",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
