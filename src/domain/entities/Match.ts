import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import {Team } from "./Team.js";
import {Stadium} from "./Stadium.js";
import {Ticket} from "./Ticket.js";
import {MatchStatus} from "./MatchStatus.js";
import {MatchStage} from "./MatchStage.js";

@Entity({ name: "matchs" }) 
export class Match {
  @PrimaryGeneratedColumn({ type: "int" })
  public id!: number; 

  @Column({ default: 0, type: "int" })
  public homeScore: number = 0; 

  @Column({ default: 0, type: "int" })
  public awayScore: number = 0; 

  @Column({ type: "int", nullable: true })
  public homeScoreExtraTime: number | null = null; 

  @Column({ type: "int", nullable: true })
  public awayScoreExtraTime: number | null = null; 

  @Column({ type: "int", nullable: true })
  public homeScoreShootOut: number | null = null; 

  @Column({ type: "int", nullable: true })
  public awayScoreShootOut: number | null = null; 

  @Column({ type: "datetime" })
  public date!: Date;

  @ManyToOne(() => Team, { eager: true })
  public homeTeam!: Team;

  @ManyToOne(() => Team, { eager: true })
  public awayTeam!: Team;

  @ManyToOne(() => Stadium, { eager: true })
  public stadium!: Stadium;

  @Column({ type: "varchar" })
  public status!: MatchStatus;

  @Column({ type: "varchar" })
  public stage!: MatchStage;

  @OneToMany(() => Ticket, (ticket) => ticket.match)
  public tickets!: Ticket[];

  constructor(id?: number, homeTeam?: Team, awayTeam?: Team, stadium?: Stadium, status?: MatchStatus, stage?: MatchStage, date?: Date) {
    if (id !== undefined) {
      if (id <= 0) throw new Error("id > 0"); 
      this.id = id;
    }
    if (homeTeam && awayTeam) {
      if (homeTeam.name === awayTeam.name) throw new Error("homeTeam.name ≠ awayTeam.name");
      this.homeTeam = homeTeam;
      this.awayTeam = awayTeam;
    }
    if (stadium) this.stadium = stadium;
    if (status) this.status = status;
    if (stage) this.stage = stage;
    if (date) this.date = date;
  }
}