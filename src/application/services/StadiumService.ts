import {ILike, Repository} from "typeorm";
import {Stadium} from "../../domain/entities/Stadium";
import {Match} from "../../domain/entities/Match";
import {NotFoundError} from "../../domain/errors/NotFoundError";

export class StadiumService {
    constructor(
        private readonly stadiumRepository: Repository<Stadium>,
        private readonly matchRepository: Repository<Match>
    ) {}

        // Retourne tous les stades avec leurs villes
    public async findAll(name?: string): Promise<Stadium[]> {
        return await this.stadiumRepository.find({
            where: name ? { name: ILike(name) } : {},
            relations: { city: true }
        });
    }

        // Récupère les parametrtes d'un stade en particulier à partir de son nom
    public async findByName(name: string): Promise<Stadium> {
        const stadium = await this.stadiumRepository.findOne({
            where: { name: ILike(name) },
            relations: { city: true }
        });

        if (!stadium) {
            throw new NotFoundError(`Stadium '${name}' not found`);
        }
        return stadium;
    }

        // Cherche tous les matchs programmés dans un stade en particulier
    public async findMatchsByStadium(stadiumName: string): Promise<Match[]> {
        // On vérifie d'abord que le stade existe bien 
        const stadium = await this.stadiumRepository.findOneBy({ name: ILike(stadiumName) });
        
        if (!stadium) {
            throw new NotFoundError(`Stadium '${stadiumName}' not found`);
        }

        return await this.matchRepository.find({
            where: { stadium: { name: ILike(stadiumName) } },
            relations: { homeTeam: true, awayTeam: true, stadium: { city: true } }
        });
    }
}