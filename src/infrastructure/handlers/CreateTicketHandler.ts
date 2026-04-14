import {Context} from "hono";
import {HTTPException} from "hono/http-exception";
import {CreateTicketSchema} from "./CreateTicketSchema.js";
import {AppDataSource } from "../database/AppDataSource.js";
import {Ticket} from "../../domain/entities/Ticket.js";
import {Match} from "../../domain/entities/Match.js";
import {TicketService} from "../../application/services/TicketService";
import {NotFoundError } from "../../domain/errors/NotFoundError";
import {ConflictError } from "../../domain/errors/ConflictError";
import {ValidationError } from "../../domain/errors/ValidationError";

export class CreateTicketHandler {
  public async handle(c: Context) {
    const body = await c.req.json();

      // Validation du format des données d'entrée avec le schéma Zod
    const validation = CreateTicketSchema.safeParse(body);

    if (!validation.success) {
      throw new HTTPException(400, { message: "Données de réservation invalides" });
    }

    const ticketRepository = AppDataSource.getRepository(Ticket);
    const matchRepository = AppDataSource.getRepository(Match);
    const ticketService = new TicketService(ticketRepository, matchRepository);

    try {

        // On appelle la méthode pour créer le ticket (Vérifie le match et siçge)
      const ticketSauve = await ticketService.createTicket(validation.data);

      return c.json({
        success: true,
        message: "Ticket créé avec succès",
        data: {
          id: ticketSauve.id,
          matchId: ticketSauve.match.id,
          seat: ticketSauve.seat,
          holder: {
            firstName: ticketSauve.firstname,
            lastName: ticketSauve.lastname,
            email: ticketSauve.email
          }
        }
      }, 201);

    } catch (e) {

      // Catch des différentes erreurs possibles
      if (e instanceof ValidationError) {

        throw new HTTPException(400, { message: e.message }); 
      }
      if (e instanceof NotFoundError) {
        throw new HTTPException(404, { message: e.message }); 
      }
      if (e instanceof ConflictError) {
        throw new HTTPException(409, { message: e.message }); 
      }

      throw e;
    }
  }
}