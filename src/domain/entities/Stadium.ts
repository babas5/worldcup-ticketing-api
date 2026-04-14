import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {City } from "./City.js";

@Entity({ name: "stadiums" })
export class Stadium {
    @PrimaryGeneratedColumn({ type: "int" })
    public id!: number;

    @Column({ type: "varchar", length: 150 })
    public name!: string;

    @Column({ type: "int" })
    public capacity!: number;

    @ManyToOne(() => City, { eager: true })
    public city!: City;

    constructor(id?: number, name?: string, city?: City, capacity?: number) {
        if (id !== undefined) {
            if (id <= 0) throw new Error("id > 0");
            this.id = id;
        }
        if (name) this.name = name;
        if (city) this.city = city;
        if (capacity !== undefined) this.capacity = capacity;
    }
}