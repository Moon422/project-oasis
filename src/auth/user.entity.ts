import { Union } from "src/location/union.entity";
import { Product } from "src/product/product.entity";
import { ChildEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
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
export abstract class User {
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

    @Column({ length: 255 })
    email: string;

    @Column({ length: 14 })
    phoneNumber: string;

    @Column({ type: "varchar", length: 255 })
    placeName: string;

    @ManyToOne((type) => Union, (union) => union.farmers, { eager: true })
    union: Union;

    @OneToOne(type => Auth, auth => auth.user)
    auth: Auth;
}

@ChildEntity(UserType.FARMER)
export class Farmer extends User {
    @OneToMany(type => Product, product => product.farmer, { eager: false })
    products: Product[];
}

@ChildEntity(UserType.ADMIN)
export class Admin extends User {

}
