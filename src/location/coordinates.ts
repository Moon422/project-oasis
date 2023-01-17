import { Column, Index } from "typeorm";

@Index(["longitude", "latitude"], { unique: true })
export class Coordinates {
    @Column({
        type: "decimal",
        precision: 11,
        scale: 8,
        name: "longitude"
    })
    longitude: number;

    @Column({
        type: "decimal",
        precision: 11,
        scale: 8,
        name: "latitude"
    })
    latitude: number;
}
