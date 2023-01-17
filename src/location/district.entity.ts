import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coordinates } from "./coordinates";
import { Division } from "./division.entity";
import { SubDistrict } from "./sub-district.entity";

@Entity("Districts")
export class District {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "varchar", length: 255 })
    bnName: string;

    @Column(() => Coordinates)
    coordinates?: Coordinates;

    @ManyToOne((type) => Division, (division) => division.districts, { eager: true })
    division: Division;

    @OneToMany((type) => SubDistrict, (subDistrict) => subDistrict.district, { eager: false })
    subDistricts: SubDistrict[];
}
