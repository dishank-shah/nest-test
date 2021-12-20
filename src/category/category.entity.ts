import { Item } from "src/item/item.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    category

    @OneToMany(() => Item, item => item.id)
    item: Item
}