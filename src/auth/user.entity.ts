import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { Auth } from "./auth.entity";
import { UserType } from "./user-type.enum";

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

    @Column(type => Address)
    address: Address;

    @Column({ type: "enum", enum: UserType, default: UserType.FARMER })
    userType: UserType;

    @OneToOne(type => Auth, auth => auth.user)
    auth: Auth;
}
