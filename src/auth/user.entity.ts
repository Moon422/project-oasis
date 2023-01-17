import { Product } from "src/product/product.entity";
import { ChildEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { Address } from "./address.entity";
import { Auth } from "./auth.entity";
import { UserType } from "./user-type.enum";

@Entity("Users")
@TableInheritance({
    column: {
        type: "enum",
        enum: UserType,
        name: "userType"
    }
})
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 60 })
    firstName: string;

    @Column({ length: 60 })
    lastName: string;

    @Column()
    dateOfBirth: Date;

    @Column({ type: "enum", enum: UserType })
    userType: UserType;

    @OneToOne(type => Auth, auth => auth.user)
    auth: Auth;
}

@ChildEntity(UserType.FARMER)
export class Farmer extends User {
    @Column(type => Address)
    address: Address;

    @OneToMany(type => Product, product => product.farmer, { eager: false })
    products: Product[];
}

@ChildEntity(UserType.ADMIN)
export class Admin extends User {

}
