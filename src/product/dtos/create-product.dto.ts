import { IsInt, IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(1024)
    details: string;

    @IsNotEmpty()
    @IsInt()
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}
