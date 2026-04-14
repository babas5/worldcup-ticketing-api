import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Country} from "./Country.js";

@Entity({ name: "cities" }) 
export class City {
    @PrimaryGeneratedColumn({ type: "int" })
    public id!: number;

    @Column({ type: "varchar", length: 100 })
    public name!: string;

    @ManyToOne(() => Country, { eager: true })
    public country!: Country;

    constructor(id?: number, name?: string, country?: Country) {
        if (id !== undefined) this.id = id;
        if (name) this.name = name;
        if (country) this.country = country;
    }
}