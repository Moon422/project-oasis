import { User } from "src/auth/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("Products")
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 1024 })
    details: string;

    @Column()
    quantity: number;

    @Column({ type: "double" })
    price: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    lastUpdatedAt: Date;

    @ManyToOne(type => User, user => user.products, { eager: true })
    user: User;
}
