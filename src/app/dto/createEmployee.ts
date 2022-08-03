import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    public name: string;

    @IsNumber()
    public experience: number;

    @IsString()
    public departmentId: string;

    @IsString()
    public status: string;

    @IsString()
    public join_date: Date;

    @IsString()
    public role: string;

}