import {Context} from 'hono';
import {HTTPException } from 'hono/http-exception';
import {AppDataSource} from '../database/AppDataSource';
import {Match} from '../../domain/entities/Match';
import {MatchService} from '../../application/services/MatchService';
import {NotFoundError} from '../../domain/errors/NotFoundError';

export class GetMatchByIdHandler {
  public async handle(c: Context) {
    const id = Number(c.req.param('id'));
    const service = new MatchService(AppDataSource.getRepository(Match)); 

    try {
      const match = await service.findById(id);
      return c.json(match);
    } catch (e) {
      if (e instanceof NotFoundError) throw new HTTPException(404, { message: e.message });
      throw e;
    }
  }
}