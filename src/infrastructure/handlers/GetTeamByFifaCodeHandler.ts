import {Context} from 'hono';
import {HTTPException} from 'hono/http-exception';
import {AppDataSource} from '../database/AppDataSource';
import {Team} from '../../domain/entities/Team';
import {Match} from '../../domain/entities/Match';
import {TeamService} from '../../application/services/TeamService';
import {FifaCode} from '../../domain/entities/FifaCode';
import {NotFoundError } from '../../domain/errors/NotFoundError';

export class GetTeamByFifaCodeHandler {
  public async handle(c: Context) {
    const code = c.req.param('fifaCode');

    try {
      new FifaCode(code);
      const service = new TeamService(
        AppDataSource.getRepository(Team),
        AppDataSource.getRepository(Match)
      );
      return c.json(await service.getByFifaCode(code));
    } catch (e) {
      if (e instanceof NotFoundError) throw new HTTPException(404, { message: e.message });
      throw new HTTPException(400, { message: "Format code invalide" });
    }
  }
}