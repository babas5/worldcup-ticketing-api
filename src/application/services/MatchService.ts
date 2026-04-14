import {Repository} from "typeorm";
import {Match} from "../../domain/entities/Match";
import {NotFoundError} from "../../domain/errors/NotFoundError";
import {MatchStage} from "../../domain/entities/MatchStage";
import {MatchStatus } from "../../domain/entities/MatchStatus";

export class MatchService {
  constructor(private readonly matchRepository: Repository<Match>) {}

    // On récupère les matchs avec filtres optionnel sur la date ou le code équipe
  public async getAll(date?: string, teamCode?: string): Promise<Match[]> {
    const findOptions: any = { where: [] };

    if (teamCode) {
        // Si on a un code équipe, on cherche si elle a jouée à domicile OU à l'extérieur
      const baseWhere = date ? { date } : {};
      findOptions.where = [
        { ...baseWhere, homeTeam: { code: teamCode } },
        { ...baseWhere, awayTeam: { code: teamCode } }
      ];
    } else if (date) {
      findOptions.where = { date };
    }

    return await this.matchRepository.find(findOptions);
  }

    // Trouve un match unique selon l'ID 
  public async findById(id: number): Promise<Match> {
    const match = await this.matchRepository.findOneBy({ id });
    if (!match) throw new NotFoundError(`Match ${id} non trouvé`);
    return match;
  }

    // Filtre les matchs selon l'étape du tournoi 
  public async findByStage(stage: MatchStage): Promise<Match[]> {
    return await this.matchRepository.find({ where: { stage } });
  }

    // Filtre les matchs selon leur statut 
  public async findByStatus(status: string): Promise<Match[]> {
    return await this.matchRepository.find({ where: { status: status as MatchStatus } });
  }
}