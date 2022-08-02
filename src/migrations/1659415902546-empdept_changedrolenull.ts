import {MigrationInterface, QueryRunner} from "typeorm";

export class empdeptChangedrolenull1659415902546 implements MigrationInterface {
    name = 'empdeptChangedrolenull1659415902546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "join_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "join_date"`);
    }

}
