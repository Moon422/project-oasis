import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import { CoordinatesDto } from "./coordinates.dto";

export class AddUnionDto {
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
    subDistrictId: string;
}
