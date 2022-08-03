import { Type } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { type } from "os";
import { CreateAddressDto } from "./createAddressdto";

export class CreateEmployeeDto {
    @IsString()
    public name: string;

    @IsString()
    public username: string;

    @IsString()
    public passsword: string;


    @IsNumber()
    public experience: number;

    @IsString()
    public departmentId: string;

    @IsString()
    public status: string;

    @IsString()
    @IsOptional()
    public join_date: Date;

    @IsString()
    public role: string;

    @ValidateNested({each:true})
    @Type(()=> CreateAddressDto)
    public address: CreateAddressDto
}