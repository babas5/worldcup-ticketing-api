import {Context} from 'hono'
import {HTTPException } from 'hono/http-exception'
import {AppDataSource} from '../database/AppDataSource'
import {City} from '../../domain/entities/City'
import {Match} from '../../domain/entities/Match'
import {CityService} from '../../application/services/CityService'
import {NotFoundError} from '../../domain/errors/NotFoundError'

export class GetCityByNameHandler {
  public async handle(c: Context) {
    
    // On récupère le nom de la ville 
    const name = c.req.param('name')
    
    // On initialise le repository et le Cityservice
    const cityRepository = AppDataSource.getRepository(City)
    const matchRepository = AppDataSource.getRepository(Match)
    const service = new CityService(cityRepository, matchRepository)

    try {
      const city = await service.findByName(name)
      return c.json(city, 200)
    } catch (e) {
      // Si la ville n'existe pas on renvoie une erreur 404
      if (e instanceof NotFoundError) {
        throw new HTTPException(404, { message: e.message }) 
      }
      throw e
    }
  }
}