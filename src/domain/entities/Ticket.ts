import {Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import {Match} from "./Match.js";

@Entity({ name: "tickets" })
export class Ticket {
  @PrimaryGeneratedColumn({ type: "int" })
  public id!: number;

  @ManyToOne(() => Match, (match) => match.tickets)
  public match!: Match;

  @Column({ type: "varchar", length: 10 })
  public seat!: string;

  @Column({ type: "varchar", length: 100 })
  public firstname!: string;

  @Column({ type: "varchar", length: 100 })
  public lastname!: string;

  @Column({ type: "varchar", length: 150 })
  public email!: string;

  constructor(
    id?: number,
    match?: Match,
    seat?: string,
    firstname?: string,
    lastname?: string,
    email?: string
  ) {
    if (id !== undefined) {
      if (id <= 0) throw new Error("id > 0");
      this.id = id;
    }
    if (match) this.match = match;
    if (seat !== undefined) {
      if (!seat.trim()) throw new Error("seat non vide");
      this.seat = seat;
    }
    if (firstname) this.firstname = firstname;
    if (lastname) this.lastname = lastname;
    if (email) this.email = email;
  }
}