import {Context} from 'hono'
import {HTTPException} from 'hono/http-exception'
import {AppDataSource} from '../database/AppDataSource'
import {Match } from '../../domain/entities/Match'
import {MatchService} from '../../application/services/MatchService'
import {MatchStage} from '../../domain/entities/MatchStage'

export class GetMatchByStage { 
  public async handle(c: Context) {
    // On récupère le paramètre et on le force en Uppercase pour correspondre au MatchStage
    const stageParam = c.req.param('stage').toUpperCase()
    // On vérifie que la phase fait partie de la liste déclarée
    const phasesValides = Object.values(MatchStage)
    const estValide = phasesValides.includes(stageParam as MatchStage)

    if (!estValide) {
      throw new HTTPException(400, { 
        message: `Phase de tournoi invalide.` 
      })
    }

    const matchRepository = AppDataSource.getRepository(Match)
    const matchService = new MatchService(matchRepository)
    
    // Récupération des matchs filtrés par stage
    const matchsFiltres = await matchService.findByStage(stageParam as MatchStage)
    
    return c.json(matchsFiltres, 200)
  }
}