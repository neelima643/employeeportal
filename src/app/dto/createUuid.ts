import { IsUUID } from "class-validator";

export class createUuid {
    @IsUUID()
    public id: string;

    
}
    
