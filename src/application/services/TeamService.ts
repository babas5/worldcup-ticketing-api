import {Repository, ILike} from "typeorm";
import {Team } from "../../domain/entities/Team";
import {Match } from "../../domain/entities/Match";
import {NotFoundError} from "../../domain/errors/NotFoundError";
import {MatchStage} from "../../domain/entities/MatchStage";

export class TeamService {
  constructor(
    private readonly teamRepository: Repository<Team>,
    private readonly matchRepository: Repository<Match>
  ) {}

    // Récupère toutes les équipes avec un filtre sur le nom
  public async getAll(name?: string, sort?: string): Promise<Team[]> {
    return await this.teamRepository.find({
      where: name ? { name: ILike(name) } : {},
      order: { name: sort === "-name" ? "DESC" : "ASC" },
      relations: { country: true }
    });
  }

    // Cherche une équipe par son code FIFA (ex: 'FRA', 'SEN', etc...)
  public async getByFifaCode(code: string): Promise<Team> {
    const team = await this.teamRepository.findOneBy({ code });
    if (!team) throw new NotFoundError(`Team ${code} not found`);
    return team;
  }

    // Récupère l'historique des matchs d'une équipe avec un filtre par phase possible
  public async getTeamMatchs(code: string, stage?: MatchStage): Promise<Match[]> {
    await this.getByFifaCode(code);

    // On prépare la condition pour chercher l'équipe à domicile ou à l'extérieur
    const whereBase = [
      { homeTeam: { code: code } },
      { awayTeam: { code: code } }
    ];

    // Si la phase est precisée on l'ajoute aux conditions de recherche
    const where = stage 
      ? whereBase.map(condition => ({ ...condition, stage }))
      : whereBase;

    return await this.matchRepository.find({
      where,
      relations: { homeTeam: true, awayTeam: true, stadium: { city: true } }
    });
  }
}