import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({ name: "countries" })
export class Country {
    @PrimaryGeneratedColumn({ type: "int" })
    public id!: number;

    @Column({ type: "varchar", length: 100 })
    public name!: string;

    @Column({ type: "varchar", length: 3 })
    public code!: string;

    constructor(id?: number, name?: string, code?: string) {
        if (id !== undefined) {
            if (id <= 0) throw new Error("id > 0");
            this.id = id;
        }
        if (name) this.name = name;
        if (code) this.code = code;
    }
}