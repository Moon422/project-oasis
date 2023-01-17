import { IsNotEmpty, IsNumber } from "class-validator";

export class CoordinatesDto {
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 8 })
    longitude: number

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 8 })
    latitude: number
}
