import {Context} from 'hono';
import {HTTPException } from 'hono/http-exception';
import {AppDataSource } from '../database/AppDataSource';
import {Stadium} from '../../domain/entities/Stadium';
import {Match} from '../../domain/entities/Match';
import {StadiumService} from '../../application/services/StadiumService';
import {NotFoundError} from '../../domain/errors/NotFoundError';

export class GetStadiumMatchsHandler {
    public async handle(c: Context) {
        const stadiumName = c.req.param('name');
        const service = new StadiumService(
            AppDataSource.getRepository(Stadium),
            AppDataSource.getRepository(Match)
        );

        try {
            const matchs = await service.findMatchsByStadium(stadiumName);
            return c.json(matchs, 200);
        } catch (e) {
            if (e instanceof NotFoundError) {
                throw new HTTPException(404, { message: e.message });
            }
            throw e;
        }
    }
}