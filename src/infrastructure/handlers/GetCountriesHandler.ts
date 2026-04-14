import {Context} from 'hono';
import {AppDataSource} from '../database/AppDataSource';
import {Country} from '../../domain/entities/Country';
import {City} from '../../domain/entities/City';
import {CountryService} from '../../application/services/CountryService';

export class GetCountriesHandler {
    public async handle(c: Context) {
        const nameFilter = c.req.query('name');
        
        const service = new CountryService(
            AppDataSource.getRepository(Country),
            AppDataSource.getRepository(City)
        );

        return c.json(await service.findAll(nameFilter));
    }
}