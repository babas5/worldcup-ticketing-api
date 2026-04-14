import {Context} from 'hono';
import {HTTPException} from 'hono/http-exception';
import {AppDataSource} from '../database/AppDataSource';
import {Country} from '../../domain/entities/Country';
import {City } from '../../domain/entities/City';
import {CountryService} from '../../application/services/CountryService';
import {NotFoundError} from '../../domain/errors/NotFoundError';

export class GetCountryCitiesHandler {
    public async handle(c: Context) {
        // On récupère le code pays depuis les paramètres de la route
        const code = c.req.param('code');
        
        const service = new CountryService(
            AppDataSource.getRepository(Country),
            AppDataSource.getRepository(City)
        );

        try {
            // Le service récupère toutes les villes rattachées au code avec la methode findCitiesByCountryCode
            const cities = await service.findCitiesByCountryCode(code);
            return c.json(cities, 200);
        } catch (e) {
            // Erreur 404 si le code pays n'existe pas
            if (e instanceof NotFoundError) {
                throw new HTTPException(404, { message: e.message });
            }
            throw e;
        }
    }
}