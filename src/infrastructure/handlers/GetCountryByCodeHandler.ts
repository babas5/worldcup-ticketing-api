import {Context} from 'hono';
import {HTTPException} from 'hono/http-exception';
import {AppDataSource} from '../database/AppDataSource';
import {Country } from '../../domain/entities/Country';
import {City} from '../../domain/entities/City';
import {CountryService} from '../../application/services/CountryService';
import {NotFoundError} from '../../domain/errors/NotFoundError';

export class GetCountryByCodeHandler {
    public async handle(c: Context) {
        // Récupération du code pays passé dans l'URL
        const code = c.req.param('code');
        
        const service = new CountryService(
            AppDataSource.getRepository(Country),
            AppDataSource.getRepository(City)
        );

        try {
            // Appel à la methode pour récupérer les infos du pays via son code
            const country = await service.findByCode(code);
            return c.json(country, 200);
        } catch (e) {
            // Erreur si le pays n'existe pas
            if (e instanceof NotFoundError) {
                throw new HTTPException(404, { message: e.message });
            }
            throw e;
        }
    }
}