import { Product } from "src/product/product.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Column()
    dateOfBirth: Date;

    @Column(type => Address)
    address: Address;

    @Column({ type: "enum", enum: UserType, default: UserType.FARMER })
    userType: UserType;

    @OneToOne(type => Auth, auth => auth.user)
    auth: Auth;

    @OneToMany(type => Product, product => product.user, { eager: false })
    products: Product[];
}
