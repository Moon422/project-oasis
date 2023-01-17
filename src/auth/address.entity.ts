import { Union } from "src/location/union.entity";
import { Column, ManyToOne } from "typeorm";

export class Address {
    @Column({ type: "varchar", length: 255 })
    placeName: string;

    @ManyToOne((type) => Union, { eager: true })
    union: Union;
}
