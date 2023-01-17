import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { CoordinatesDto } from "./coordinates.dto";

export class AddDivisionDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    bnName: string;

    coordinates?: CoordinatesDto;
}
