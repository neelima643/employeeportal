import {MigrationInterface, QueryRunner} from "typeorm";

export class empdeptChangeddephead1659429182185 implements MigrationInterface {
    name = 'empdeptChangeddephead1659429182185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "dep_head"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" ADD "dep_head" character varying NOT NULL`);
    }

}
