import {Team} from "@domain/entities/Team";
import {Stadium} from "@domain/entities/Stadium";
import {MatchStatus} from "@domain/entities/MatchStatus";
import {MatchStage} from "@domain/entities/MatchStage";

export class Match {

  public homeScore: number = 0;
  public awayScore: number = 0;
  public homeScoreExtraTime: number | null = null;
  public awayScoreExtraTime: number | null = null;
  public homeScoreShootOut: number | null = null;
  public awayScoreShootOut: number | null = null;

  constructor(
    public id: number,
    public homeTeam: Team,
    public awayTeam: Team,
    public stadium: Stadium,
    public status: MatchStatus,
    public stage: MatchStage,
    public date: Date
  ) {
    
    if (id <= 0) {
      throw new Error("L'identifiant du match doit être supérieur à 0.");
    }

    if (homeTeam.code === awayTeam.code) {
      throw new Error("Une équipe ne peut pas s'affronter elle-même.");
    }
  }

  isDraw(): boolean {
    return this.homeScore === this.awayScore;
  }
}
