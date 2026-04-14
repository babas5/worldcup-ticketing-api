import {Context} from 'hono';
import {HTTPException } from 'hono/http-exception';
import {AppDataSource} from '../database/AppDataSource';
import {City} from '../../domain/entities/City';
import {Match} from '../../domain/entities/Match';
import {CityService} from '../../application/services/CityService';
import {NotFoundError} from '../../domain/errors/NotFoundError';

export class GetCityMatchsHandler {
  public async handle(c: Context) {
    // Récupération du nom de la ville 
    const cityName = c.req.param('name');

    const cityService = new CityService(
      AppDataSource.getRepository(City),
      AppDataSource.getRepository(Match)
    );

    try {
      // Le service se charge de filtrer les matchs associés à cette ville
      const matchs = await cityService.findMatchsByCity(cityName);
      return c.json(matchs, 200);
      
    } catch (e) {
      // On renvoie une errreur si la ville n'existe pas
      if (e instanceof NotFoundError) {
        throw new HTTPException(404, { message: e.message }); 
      }
      throw e;
    }
  }
}