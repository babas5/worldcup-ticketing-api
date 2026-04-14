import {Context} from 'hono';
import {AppDataSource} from '../database/AppDataSource';
import {Stadium} from '../../domain/entities/Stadium';
import {Match} from '../../domain/entities/Match';
import {StadiumService } from '../../application/services/StadiumService';

export class GetStadiumsHandler {
    public async handle(c: Context) {
        const nameFilter = c.req.query('name');
        const service = new StadiumService(
            AppDataSource.getRepository(Stadium),
            AppDataSource.getRepository(Match)
        );

        return c.json(await service.findAll(nameFilter));
    }
}