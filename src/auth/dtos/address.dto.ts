import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";

export class AddressDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    placeName: string;

    @IsNotEmpty()
    @IsUUID()
    unionId: string;
}
