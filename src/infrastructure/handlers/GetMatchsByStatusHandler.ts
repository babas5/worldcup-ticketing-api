import {Context} from 'hono'
import {HTTPException } from 'hono/http-exception'
import {AppDataSource} from '../database/AppDataSource'
import {Match} from '../../domain/entities/Match'
import {MatchService } from '../../application/services/MatchService'

export class GetMatchsByStatusHandler {
  public async handle(c: Context) {
    const statutParam = c.req.param('status').toLowerCase()
    // Liste des statuts acceptés par le système
    const statutsAutorises = ['scheduled', 'live', 'finished', 'cancelled']
    const estValide = statutsAutorises.includes(statutParam)

      // Si le statut pas dans la liste, erreur 400
    if (!estValide) {
      throw new HTTPException(400, { 
        message: `Statut invalide. Valeurs autorisées : ${statutsAutorises.join(', ')}` 
      })
    }

    const matchRepository = AppDataSource.getRepository(Match)
    const matchService = new MatchService(matchRepository)

    // On récupère la liste des matchs correspondant au statut
    const matchsFiltres = await matchService.findByStatus(statutParam)
    
    return c.json(matchsFiltres, 200)
  }
}