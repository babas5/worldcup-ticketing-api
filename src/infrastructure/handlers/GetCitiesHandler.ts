import {Context} from 'hono'
import {AppDataSource} from '../database/AppDataSource'
import { City} from '../../domain/entities/City'
import {Match} from '../../domain/entities/Match'
import {CityService } from '../../application/services/CityService'

export class GetCitiesHandler {
  public async handle(c: Context) {
    const nameFilter = c.req.query('name')  
    const cityRepository = AppDataSource.getRepository(City)
    const matchRepository = AppDataSource.getRepository(Match)
    const service = new CityService(cityRepository, matchRepository)
    const result = await service.findAll(nameFilter)
    
    return c.json(result)
  }
}