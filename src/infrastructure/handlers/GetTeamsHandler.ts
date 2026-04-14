import {Context} from 'hono';
import {AppDataSource} from '../database/AppDataSource';
import {Team} from '../../domain/entities/Team';
import {Match} from '../../domain/entities/Match';
import {TeamService} from '../../application/services/TeamService';

export class GetTeamsHandler {
  public async handle(c: Context) {
    const name = c.req.query('name');
    const sort = c.req.query('sort');

    const service = new TeamService(
      AppDataSource.getRepository(Team),
      AppDataSource.getRepository(Match)
    );

    return c.json(await service.getAll(name, sort));
  }
}