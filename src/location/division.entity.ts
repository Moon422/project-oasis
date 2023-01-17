import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coordinates } from "./coordinates";
import { District } from "./district.entity";

@Entity("Divisions")
export class Division {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255, unique: true })
    name: string;

    @Column({ type: "varchar", length: 255 })
    bnName: string;

    @Column(() => Coordinates)
    coordinates?: Coordinates;

    @OneToMany((type) => District, (district) => district.division, { eager: false })
    districts: District[];
}
