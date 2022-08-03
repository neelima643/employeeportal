import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateDepartmentDto {
    @IsString()
    public name: string;

    @IsString()
    public deptHead: string;
}