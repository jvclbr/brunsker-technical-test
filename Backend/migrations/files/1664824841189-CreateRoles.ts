import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRoles1664824841189 implements MigrationInterface {
    name = 'CreateRoles1664824841189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "indicator_type_entity" ("id" integer PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "description" varchar NOT NULL, "active" boolean NOT NULL DEFAULT (1))`);
        await queryRunner.query(`CREATE TABLE "indicator_entity" ("id" integer PRIMARY KEY NOT NULL, "value" varchar NOT NULL, "description" varchar NOT NULL, "active" boolean NOT NULL DEFAULT (1), "indicatorTypeId" integer)`);
        await queryRunner.query(`CREATE TABLE "users_roles_entity" ("userEntityId" integer NOT NULL, "roleEntityId" integer NOT NULL, PRIMARY KEY ("userEntityId", "roleEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0d60521e1cecf4bd669ebc8538" ON "users_roles_entity" ("userEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a2f84354ee39afb9dba12c21a8" ON "users_roles_entity" ("roleEntityId") `);
        await queryRunner.query(`CREATE TABLE "temporary_indicator_entity" ("id" integer PRIMARY KEY NOT NULL, "value" varchar NOT NULL, "description" varchar NOT NULL, "active" boolean NOT NULL DEFAULT (1), "indicatorTypeId" integer, CONSTRAINT "FK_cf152aa75dd8de36bd88ae5448c" FOREIGN KEY ("indicatorTypeId") REFERENCES "indicator_type_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_indicator_entity"("id", "value", "description", "active", "indicatorTypeId") SELECT "id", "value", "description", "active", "indicatorTypeId" FROM "indicator_entity"`);
        await queryRunner.query(`DROP TABLE "indicator_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_indicator_entity" RENAME TO "indicator_entity"`);
        await queryRunner.query(`DROP INDEX "IDX_0d60521e1cecf4bd669ebc8538"`);
        await queryRunner.query(`DROP INDEX "IDX_a2f84354ee39afb9dba12c21a8"`);
        await queryRunner.query(`CREATE TABLE "temporary_users_roles_entity" ("userEntityId" integer NOT NULL, "roleEntityId" integer NOT NULL, CONSTRAINT "FK_0d60521e1cecf4bd669ebc85389" FOREIGN KEY ("userEntityId") REFERENCES "user_entity" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_a2f84354ee39afb9dba12c21a8a" FOREIGN KEY ("roleEntityId") REFERENCES "indicator_entity" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("userEntityId", "roleEntityId"))`);
        await queryRunner.query(`INSERT INTO "temporary_users_roles_entity"("userEntityId", "roleEntityId") SELECT "userEntityId", "roleEntityId" FROM "users_roles_entity"`);
        await queryRunner.query(`DROP TABLE "users_roles_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_users_roles_entity" RENAME TO "users_roles_entity"`);
        await queryRunner.query(`CREATE INDEX "IDX_0d60521e1cecf4bd669ebc8538" ON "users_roles_entity" ("userEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a2f84354ee39afb9dba12c21a8" ON "users_roles_entity" ("roleEntityId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_a2f84354ee39afb9dba12c21a8"`);
        await queryRunner.query(`DROP INDEX "IDX_0d60521e1cecf4bd669ebc8538"`);
        await queryRunner.query(`ALTER TABLE "users_roles_entity" RENAME TO "temporary_users_roles_entity"`);
        await queryRunner.query(`CREATE TABLE "users_roles_entity" ("userEntityId" integer NOT NULL, "roleEntityId" integer NOT NULL, PRIMARY KEY ("userEntityId", "roleEntityId"))`);
        await queryRunner.query(`INSERT INTO "users_roles_entity"("userEntityId", "roleEntityId") SELECT "userEntityId", "roleEntityId" FROM "temporary_users_roles_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_users_roles_entity"`);
        await queryRunner.query(`CREATE INDEX "IDX_a2f84354ee39afb9dba12c21a8" ON "users_roles_entity" ("roleEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0d60521e1cecf4bd669ebc8538" ON "users_roles_entity" ("userEntityId") `);
        await queryRunner.query(`ALTER TABLE "indicator_entity" RENAME TO "temporary_indicator_entity"`);
        await queryRunner.query(`CREATE TABLE "indicator_entity" ("id" integer PRIMARY KEY NOT NULL, "value" varchar NOT NULL, "description" varchar NOT NULL, "active" boolean NOT NULL DEFAULT (1), "indicatorTypeId" integer)`);
        await queryRunner.query(`INSERT INTO "indicator_entity"("id", "value", "description", "active", "indicatorTypeId") SELECT "id", "value", "description", "active", "indicatorTypeId" FROM "temporary_indicator_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_indicator_entity"`);
        await queryRunner.query(`DROP INDEX "IDX_a2f84354ee39afb9dba12c21a8"`);
        await queryRunner.query(`DROP INDEX "IDX_0d60521e1cecf4bd669ebc8538"`);
        await queryRunner.query(`DROP TABLE "users_roles_entity"`);
        await queryRunner.query(`DROP TABLE "indicator_entity"`);
        await queryRunner.query(`DROP TABLE "indicator_type_entity"`);
    }

}
