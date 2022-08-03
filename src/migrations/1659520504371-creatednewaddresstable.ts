import {MigrationInterface, QueryRunner} from "typeorm";

export class creatednewaddresstable1659520504371 implements MigrationInterface {
    name = 'creatednewaddresstable1659520504371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address_lane1" character varying NOT NULL, "address_lane2" character varying, "city" character varying, "state" character varying, "country" character varying, "pincode" character varying, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_2a4f5082f1be346e2b8cdec2194" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "username" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "passsword" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "join_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "role" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "role" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "join_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "passsword" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "username" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_id"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
