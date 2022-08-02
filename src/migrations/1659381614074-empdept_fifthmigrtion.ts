import {MigrationInterface, QueryRunner} from "typeorm";

export class empdeptFifthmigrtion1659381614074 implements MigrationInterface {
    name = 'empdeptFifthmigrtion1659381614074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" RENAME COLUMN "department_head" TO "dep_head"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "department_head"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "department_head" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "department" RENAME COLUMN "dep_head" TO "department_head"`);
    }

}
