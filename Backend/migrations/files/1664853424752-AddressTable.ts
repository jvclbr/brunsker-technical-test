import {MigrationInterface, QueryRunner} from "typeorm";

export class AddressTable1664853424752 implements MigrationInterface {
    name = 'AddressTable1664853424752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "pais" varchar NOT NULL DEFAULT ('BR'), "logradouro" varchar NOT NULL, "numero" varchar NOT NULL, "complemento" varchar, "bairro" varchar NOT NULL, "cep" varchar NOT NULL, "active" boolean NOT NULL DEFAULT (1), "ufId" integer, "localidadeId" integer)`);
        await queryRunner.query(`CREATE TABLE "ufs_localities_entity" ("ufId" integer NOT NULL, "localityId" integer NOT NULL, PRIMARY KEY ("ufId", "localityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0c9ba878595e61602a586038dc" ON "ufs_localities_entity" ("ufId") `);
        await queryRunner.query(`CREATE INDEX "IDX_391f3ae47a1df4ac8620bd567c" ON "ufs_localities_entity" ("localityId") `);
        await queryRunner.query(`CREATE TABLE "temporary_address_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "pais" varchar NOT NULL DEFAULT ('BR'), "logradouro" varchar NOT NULL, "numero" varchar NOT NULL, "complemento" varchar, "bairro" varchar NOT NULL, "cep" varchar NOT NULL, "active" boolean NOT NULL DEFAULT (1), "ufId" integer, "localidadeId" integer, CONSTRAINT "FK_e21ba8265f443b6ad658cb7758e" FOREIGN KEY ("ufId") REFERENCES "indicator_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_85bfdec26a1b8a8695cbedd3cb4" FOREIGN KEY ("localidadeId") REFERENCES "indicator_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_address_entity"("id", "pais", "logradouro", "numero", "complemento", "bairro", "cep", "active", "ufId", "localidadeId") SELECT "id", "pais", "logradouro", "numero", "complemento", "bairro", "cep", "active", "ufId", "localidadeId" FROM "address_entity"`);
        await queryRunner.query(`DROP TABLE "address_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_address_entity" RENAME TO "address_entity"`);
        await queryRunner.query(`DROP INDEX "IDX_0c9ba878595e61602a586038dc"`);
        await queryRunner.query(`DROP INDEX "IDX_391f3ae47a1df4ac8620bd567c"`);
        await queryRunner.query(`CREATE TABLE "temporary_ufs_localities_entity" ("ufId" integer NOT NULL, "localityId" integer NOT NULL, CONSTRAINT "FK_0c9ba878595e61602a586038dc3" FOREIGN KEY ("ufId") REFERENCES "indicator_entity" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_391f3ae47a1df4ac8620bd567ca" FOREIGN KEY ("localityId") REFERENCES "indicator_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("ufId", "localityId"))`);
        await queryRunner.query(`INSERT INTO "temporary_ufs_localities_entity"("ufId", "localityId") SELECT "ufId", "localityId" FROM "ufs_localities_entity"`);
        await queryRunner.query(`DROP TABLE "ufs_localities_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_ufs_localities_entity" RENAME TO "ufs_localities_entity"`);
        await queryRunner.query(`CREATE INDEX "IDX_0c9ba878595e61602a586038dc" ON "ufs_localities_entity" ("ufId") `);
        await queryRunner.query(`CREATE INDEX "IDX_391f3ae47a1df4ac8620bd567c" ON "ufs_localities_entity" ("localityId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_391f3ae47a1df4ac8620bd567c"`);
        await queryRunner.query(`DROP INDEX "IDX_0c9ba878595e61602a586038dc"`);
        await queryRunner.query(`ALTER TABLE "ufs_localities_entity" RENAME TO "temporary_ufs_localities_entity"`);
        await queryRunner.query(`CREATE TABLE "ufs_localities_entity" ("ufId" integer NOT NULL, "localityId" integer NOT NULL, PRIMARY KEY ("ufId", "localityId"))`);
        await queryRunner.query(`INSERT INTO "ufs_localities_entity"("ufId", "localityId") SELECT "ufId", "localityId" FROM "temporary_ufs_localities_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_ufs_localities_entity"`);
        await queryRunner.query(`CREATE INDEX "IDX_391f3ae47a1df4ac8620bd567c" ON "ufs_localities_entity" ("localityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0c9ba878595e61602a586038dc" ON "ufs_localities_entity" ("ufId") `);
        await queryRunner.query(`ALTER TABLE "address_entity" RENAME TO "temporary_address_entity"`);
        await queryRunner.query(`CREATE TABLE "address_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "pais" varchar NOT NULL DEFAULT ('BR'), "logradouro" varchar NOT NULL, "numero" varchar NOT NULL, "complemento" varchar, "bairro" varchar NOT NULL, "cep" varchar NOT NULL, "active" boolean NOT NULL DEFAULT (1), "ufId" integer, "localidadeId" integer)`);
        await queryRunner.query(`INSERT INTO "address_entity"("id", "pais", "logradouro", "numero", "complemento", "bairro", "cep", "active", "ufId", "localidadeId") SELECT "id", "pais", "logradouro", "numero", "complemento", "bairro", "cep", "active", "ufId", "localidadeId" FROM "temporary_address_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_address_entity"`);
        await queryRunner.query(`DROP INDEX "IDX_391f3ae47a1df4ac8620bd567c"`);
        await queryRunner.query(`DROP INDEX "IDX_0c9ba878595e61602a586038dc"`);
        await queryRunner.query(`DROP TABLE "ufs_localities_entity"`);
        await queryRunner.query(`DROP TABLE "address_entity"`);
    }

}
