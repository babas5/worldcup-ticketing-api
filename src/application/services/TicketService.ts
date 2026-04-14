import {Repository} from "typeorm";
import {Ticket} from "../../domain/entities/Ticket";
import {Match} from "../../domain/entities/Match";
import {NotFoundError } from "../../domain/errors/NotFoundError";
import {ConflictError} from "../../domain/errors/ConflictError";

export class TicketService {
  constructor(
    private readonly ticketRepository: Repository<Ticket>,
    private readonly matchRepository: Repository<Match>
  ) {}

    // Méthode de création d'un ticket /
  public async createTicket(data: any): Promise<Ticket> {
    const match = await this.matchRepository.findOneBy({ id: data.matchId });
    //On v"rifie que le match existe bien 
    if (!match) {
      throw new NotFoundError(`Match with id ${data.matchId} not found`);
    }
    // On vérifie que le siège est dispo pour le match en question 
    const isReserved = await this.ticketRepository.findOneBy({
      match: { id: data.matchId },
      seat: data.seat
    });
    // Si le siège est déjà pris, erreur
    if (isReserved) {
      throw new ConflictError(`Seat ${data.seat} is already reserved for this match`);
    }

    const ticket = new Ticket(
      undefined,
      match,
      data.seat,
      data.customer.firstname,
      data.customer.lastname,
      data.customer.email
    );

    return await this.ticketRepository.save(ticket);
  }
}