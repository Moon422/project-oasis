import { Column } from "typeorm";

export class Address {
    @Column({ name: "placeName", length: 60 })
    placeName: string;

    @Column({ name: "postOffice", length: 60 })
    postOffice: string;

    @Column({ name: "policeStation", length: 60 })
    policeStation: string;

    @Column({ name: "district", length: 60 })
    district: string;
}
