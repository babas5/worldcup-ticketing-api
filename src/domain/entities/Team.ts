import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Country } from "./Country.js";

@Entity({ name: "teams" })
export class Team {
  @PrimaryGeneratedColumn({ type: "int" })
  public id!: number;

  @Column({ type: "varchar", length: 100 })
  public name!: string;

  @Column({ length: 3, type: "varchar" })
  public code!: string;

  @ManyToOne(() => Country, { eager: true })
  public country!: Country;

  constructor(id?: number, name?: string, code?: string, country?: Country) {
    if (id !== undefined) {
      if (id <= 0) throw new Error("id > 0");
      this.id = id;
    }
    if (name) this.name = name;
    if (code) {
      if (code.length !== 3) throw new Error("code length === 3");
      this.code = code;
    }
    if (country) this.country = country;
  }
}