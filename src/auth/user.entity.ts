import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auth } from "./auth.entity";

@Entity("Users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 60 })
    firstName: string;

    @Column({ length: 60 })
    lastName: string;

    @Column({ type: "tinyint" })
    age: number;

    @OneToOne(type => Auth, auth => auth.user)
    auth: Auth;
}
