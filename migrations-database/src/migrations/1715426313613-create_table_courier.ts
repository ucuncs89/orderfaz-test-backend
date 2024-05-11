import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCourier1715426313613 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "courier",
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
            name: "logistic_name",
            type: "varchar",
          },
          {
            name: "amount",
            type: "double precision",
          },
          {
            name: "origin_name",
            type: "varchar",
          },
          {
            name: "destination_name",
            type: "varchar",
          },
          {
            name: "duration",
            type: "varchar",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("courier");
  }
}
