import { Farmer } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coordinates } from "./coordinates";
import { SubDistrict } from "./sub-district.entity";

@Entity("Unions")
export class Union {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "varchar", length: 255 })
    bnName: string;

    @Column(() => Coordinates)
    coordinates?: Coordinates;

    @ManyToOne((type) => SubDistrict, (subDistrict) => subDistrict.unions, { eager: true })
    subDistrict: SubDistrict;

    @OneToMany((type) => Farmer, (farmer) => farmer.union, { eager: false })
    farmers: Farmer[];
}
