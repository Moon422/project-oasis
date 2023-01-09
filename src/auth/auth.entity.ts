import { Column, Entity, JoinColumn, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("Auths")
export class Auth {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 32, unique: true })
    username: string;

    @Column()
    password: string;

    @OneToOne(type => User, user => user.auth, { eager: true })
    @JoinColumn()
    user: User;
}
