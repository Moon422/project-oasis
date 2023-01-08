import { IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class AuthCredDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(32)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(32)
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    password: string;
}
