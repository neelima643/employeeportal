import {MigrationInterface, QueryRunner} from "typeorm";

export class empdeptAddedpassword1659422906087 implements MigrationInterface {
    name = 'empdeptAddedpassword1659422906087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "passsword" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "passsword"`);
    }

}
