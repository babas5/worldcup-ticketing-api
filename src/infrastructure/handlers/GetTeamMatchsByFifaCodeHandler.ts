import {Context} from 'hono';
import {HTTPException} from 'hono/http-exception';
import {AppDataSource} from '../database/AppDataSource';
import {Team} from '../../domain/entities/Team';
import {Match} from '../../domain/entities/Match';
import {TeamService} from '../../application/services/TeamService';
import {NotFoundError } from '../../domain/errors/NotFoundError';

export class GetTeamMatchsByFifaCodeHandler {
  public async handle(c: Context) {
    const code = c.req.param('fifaCode');
    const service = new TeamService(
      AppDataSource.getRepository(Team),
      AppDataSource.getRepository(Match)
    );

    try {
      return c.json(await service.getTeamMatchs(code));
    } catch (e) {
      const status = e instanceof NotFoundError ? 404 : 400;
      throw new HTTPException(status, { message: (e as Error).message });
    }
  }
}