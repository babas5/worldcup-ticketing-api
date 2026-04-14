import {Context} from 'hono';
import {HTTPException} from 'hono/http-exception';
import {AppDataSource} from '../database/AppDataSource';
import {Stadium} from '../../domain/entities/Stadium';
import {Match } from '../../domain/entities/Match';
import {StadiumService} from '../../application/services/StadiumService';
import {NotFoundError} from '../../domain/errors/NotFoundError';

export class GetStadiumByNameHandler {
    public async handle(c: Context) {
        // On récupère le nom du stade
        const name = c.req.param('name');
        const service = new StadiumService(
            AppDataSource.getRepository(Stadium),
            AppDataSource.getRepository(Match)
        );

        try {
            // Recherche du stade via le service
            const stadium = await service.findByName(name);
            return c.json(stadium, 200);
        } catch (e) {
            // Si le stade n'existe pas : on renvoie une erreur 404
            if (e instanceof NotFoundError) {
                throw new HTTPException(404, { message: e.message });
            }
            throw e;
        }
    }
}