import {Context} from 'hono';
import {HTTPException} from 'hono/http-exception';
import {AppDataSource} from '../database/AppDataSource';
import {Team} from '../../domain/entities/Team';
import {Match } from '../../domain/entities/Match';
import {TeamService} from '../../application/services/TeamService';
import {MatchStage} from '../../domain/entities/MatchStage';
import {NotFoundError} from '../../domain/errors/NotFoundError';

export class GetTeamMatchsByStageHandler {
  public async handle(c: Context) {
    // On récupère le code de l'équipe et l'étape du tournoi
    const code = c.req.param('fifaCode');
    const stage = c.req.param('stage').toUpperCase() as MatchStage;

    // On vérifie0 que le stage existe bien dans l'Enum
    if (!Object.values(MatchStage).includes(stage)) {
      throw new HTTPException(400, { message: "Stage invalide" });
    }

    const service = new TeamService(
      AppDataSource.getRepository(Team),
      AppDataSource.getRepository(Match)
    );

    try {
      // Le service filtre les matchs de l'équipe pour l'étape spécifiée
      return c.json(await service.getTeamMatchs(code, stage));
    } catch (e) {
      const status = e instanceof NotFoundError ? 404 : 400;
      throw new HTTPException(status, { message: (e as Error).message });
    }
  }
}