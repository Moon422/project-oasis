import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import { CoordinatesDto } from "./coordinates.dto";

export class AddDistrictDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    bnName: string;

    coordinates?: CoordinatesDto;

    @IsNotEmpty()
    @IsUUID()
    divisionId: string;
}
