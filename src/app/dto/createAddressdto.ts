import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateAddressDto {
    @IsString()
    public addressLane1: string;

    @IsString()
    public addressLane2: string;

    @IsString()
    public city: string;

    @IsString()
    public state: string;

    @IsString()
    public country: string;

    @IsString()
    public pincode: string;

}