import {MigrationInterface, QueryRunner} from "typeorm";

export class RealEstateTable1664931208762 implements MigrationInterface {
    name = 'RealEstateTable1664931208762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "real_estate_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "valor" decimal(9,2) NOT NULL DEFAULT (0), "condominio" decimal(6,2) NOT NULL DEFAULT (0), "quartos" integer NOT NULL, "banheiros" integer NOT NULL, "mobiliado" boolean NOT NULL, "area" integer NOT NULL, "venda" boolean NOT NULL, "aluguel" boolean NOT NULL, "dataAnuncio" datetime NOT NULL DEFAULT (datetime('now')), "active" boolean NOT NULL DEFAULT (1), "typeId" integer, "addressId" integer, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "user_real_estate_entity" ("userEntityId" integer NOT NULL, "realEstateEntityId" integer NOT NULL, PRIMARY KEY ("userEntityId", "realEstateEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_02a545edc2320186682b599b08" ON "user_real_estate_entity" ("userEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c66490b90cc30ee5fd3990258e" ON "user_real_estate_entity" ("realEstateEntityId") `);
        await queryRunner.query(`CREATE TABLE "temporary_real_estate_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "valor" decimal(9,2) NOT NULL DEFAULT (0), "condominio" decimal(6,2) NOT NULL DEFAULT (0), "quartos" integer NOT NULL, "banheiros" integer NOT NULL, "mobiliado" boolean NOT NULL, "area" integer NOT NULL, "venda" boolean NOT NULL, "aluguel" boolean NOT NULL, "dataAnuncio" datetime NOT NULL DEFAULT (datetime('now')), "active" boolean NOT NULL DEFAULT (1), "typeId" integer, "addressId" integer, "userId" integer, CONSTRAINT "FK_5ded97c41d142cb4651cf261e24" FOREIGN KEY ("typeId") REFERENCES "indicator_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_2b88068eb0f6dd0c5e0ade50f90" FOREIGN KEY ("addressId") REFERENCES "address_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_175866d84175634b00a70064cbd" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_real_estate_entity"("id", "nome", "valor", "condominio", "quartos", "banheiros", "mobiliado", "area", "venda", "aluguel", "dataAnuncio", "active", "typeId", "addressId", "userId") SELECT "id", "nome", "valor", "condominio", "quartos", "banheiros", "mobiliado", "area", "venda", "aluguel", "dataAnuncio", "active", "typeId", "addressId", "userId" FROM "real_estate_entity"`);
        await queryRunner.query(`DROP TABLE "real_estate_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_real_estate_entity" RENAME TO "real_estate_entity"`);
        await queryRunner.query(`DROP INDEX "IDX_02a545edc2320186682b599b08"`);
        await queryRunner.query(`DROP INDEX "IDX_c66490b90cc30ee5fd3990258e"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_real_estate_entity" ("userEntityId" integer NOT NULL, "realEstateEntityId" integer NOT NULL, CONSTRAINT "FK_02a545edc2320186682b599b08e" FOREIGN KEY ("userEntityId") REFERENCES "user_entity" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_c66490b90cc30ee5fd3990258e1" FOREIGN KEY ("realEstateEntityId") REFERENCES "real_estate_entity" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("userEntityId", "realEstateEntityId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_real_estate_entity"("userEntityId", "realEstateEntityId") SELECT "userEntityId", "realEstateEntityId" FROM "user_real_estate_entity"`);
        await queryRunner.query(`DROP TABLE "user_real_estate_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_real_estate_entity" RENAME TO "user_real_estate_entity"`);
        await queryRunner.query(`CREATE INDEX "IDX_02a545edc2320186682b599b08" ON "user_real_estate_entity" ("userEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c66490b90cc30ee5fd3990258e" ON "user_real_estate_entity" ("realEstateEntityId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_c66490b90cc30ee5fd3990258e"`);
        await queryRunner.query(`DROP INDEX "IDX_02a545edc2320186682b599b08"`);
        await queryRunner.query(`ALTER TABLE "user_real_estate_entity" RENAME TO "temporary_user_real_estate_entity"`);
        await queryRunner.query(`CREATE TABLE "user_real_estate_entity" ("userEntityId" integer NOT NULL, "realEstateEntityId" integer NOT NULL, PRIMARY KEY ("userEntityId", "realEstateEntityId"))`);
        await queryRunner.query(`INSERT INTO "user_real_estate_entity"("userEntityId", "realEstateEntityId") SELECT "userEntityId", "realEstateEntityId" FROM "temporary_user_real_estate_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_user_real_estate_entity"`);
        await queryRunner.query(`CREATE INDEX "IDX_c66490b90cc30ee5fd3990258e" ON "user_real_estate_entity" ("realEstateEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_02a545edc2320186682b599b08" ON "user_real_estate_entity" ("userEntityId") `);
        await queryRunner.query(`ALTER TABLE "real_estate_entity" RENAME TO "temporary_real_estate_entity"`);
        await queryRunner.query(`CREATE TABLE "real_estate_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "valor" decimal(9,2) NOT NULL DEFAULT (0), "condominio" decimal(6,2) NOT NULL DEFAULT (0), "quartos" integer NOT NULL, "banheiros" integer NOT NULL, "mobiliado" boolean NOT NULL, "area" integer NOT NULL, "venda" boolean NOT NULL, "aluguel" boolean NOT NULL, "dataAnuncio" datetime NOT NULL DEFAULT (datetime('now')), "active" boolean NOT NULL DEFAULT (1), "typeId" integer, "addressId" integer, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "real_estate_entity"("id", "nome", "valor", "condominio", "quartos", "banheiros", "mobiliado", "area", "venda", "aluguel", "dataAnuncio", "active", "typeId", "addressId", "userId") SELECT "id", "nome", "valor", "condominio", "quartos", "banheiros", "mobiliado", "area", "venda", "aluguel", "dataAnuncio", "active", "typeId", "addressId", "userId" FROM "temporary_real_estate_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_real_estate_entity"`);
        await queryRunner.query(`DROP INDEX "IDX_c66490b90cc30ee5fd3990258e"`);
        await queryRunner.query(`DROP INDEX "IDX_02a545edc2320186682b599b08"`);
        await queryRunner.query(`DROP TABLE "user_real_estate_entity"`);
        await queryRunner.query(`DROP TABLE "real_estate_entity"`);
    }

}
