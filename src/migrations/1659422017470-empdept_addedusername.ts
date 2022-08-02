import {MigrationInterface, QueryRunner} from "typeorm";

export class empdeptAddedusername1659422017470 implements MigrationInterface {
    name = 'empdeptAddedusername1659422017470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "username" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "username"`);
    }

}
