import {Context} from 'hono';
import {HTTPException} from 'hono/http-exception';
import {AppDataSource} from '../database/AppDataSource';
import {Match } from '../../domain/entities/Match';
import {MatchService} from '../../application/services/MatchService';
import {FifaCode} from '../../domain/entities/FifaCode';

export class GetMatchsHandler {
  public async handle(c: Context) {
    const teamCodeParam = c.req.query('team[code]');
    const dateParam = c.req.query('date');

    // On valide le format de la date via une expression régulière 
    if (dateParam && !/^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
      throw new HTTPException(400, { message: 'Format YYYY-MM-DD requis' });
    }

    // Validation du code FIFA via le Value Object
    let codeValide: string | undefined;
    if (teamCodeParam) {
      try {
        codeValide = new FifaCode(teamCodeParam).getValue();
      } catch {
        // Si code invalide : erreur 404
        throw new HTTPException(400, { message: 'Code FIFA invalide' });
      }
    }

    const service = new MatchService(AppDataSource.getRepository(Match));
    const resultat = await service.getAll(dateParam, codeValide);

    return c.json(resultat);
  }
}