import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class AddressDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    placeName: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    postOffice: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    policeStation: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    district: string;
}
