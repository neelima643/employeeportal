import {MigrationInterface, QueryRunner} from "typeorm";

export class empdeptNewchangefordepHead1659433735358 implements MigrationInterface {
    name = 'empdeptNewchangefordepHead1659433735358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" ADD "dept_head" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "dept_head"`);
    }

}
