import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTable1664606573363 implements MigrationInterface {
    name = 'CreateUserTable1664606573363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "active" boolean NOT NULL DEFAULT (1), CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
