import { IsNotEmpty, IsString, MinLength, MaxLength, IsNumber, IsNotEmptyObject } from "class-validator";
import { AuthCredDto } from "./auth-cred.dto";

export class NewUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(60)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(60)
    lastName: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsNotEmptyObject()
    auth: AuthCredDto;
}