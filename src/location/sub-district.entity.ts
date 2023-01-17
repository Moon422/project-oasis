import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coordinates } from "./coordinates";
import { District } from "./district.entity";
import { Union } from "./union.entity";

@Entity("Subdistricts")
export class SubDistrict {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "varchar", length: 255 })
    bnName: string;

    @Column(() => Coordinates)
    coordinates?: Coordinates;

    @ManyToOne((type) => District, (district) => district.subDistricts, { eager: true })
    district: District;

    @OneToMany((type) => Union, (union) => union.subDistrict, { eager: false })
    unions: Union;
}
