import {ILike, Repository} from "typeorm";
import {City} from "../../domain/entities/City";
import {Match} from "../../domain/entities/Match";
import {NotFoundError} from "../../domain/errors/NotFoundError";

export class CityService {
    constructor(
        private readonly cityRepository: Repository<City>,
        private readonly matchRepository: Repository<Match>
    ) {}

    // Récupère toutes les villes
    public async findAll(name?: string): Promise<City[]> {
        const where = name ? { name: ILike(name) } : {};
        return await this.cityRepository.find({ where });
    }

        // Cherche une ville précise et renvoie une erreur 404 si elle existe pas
    public async findByName(name: string): Promise<City> {
        const city = await this.cityRepository.findOne({
            where: { name: ILike(name) }
        });

        if (!city) {
            throw new NotFoundError(`La ville de '${name}' n'existe pas`);
        }
        return city;
    }

        // Récupère la liste des matchs qui ont lieu dans une ville précise
    public async findMatchsByCity(cityName: string): Promise<Match[]> {
        const city = await this.cityRepository.findOneBy({ name: cityName });
        
        if (!city) {
            throw new NotFoundError(`La ville de'${cityName}' n'existe pas`);
        }

            // On retrouve les matchs avec la relation Match > Stadium > City
        return await this.matchRepository.find({
            where: {
                stadium: {
                    city: { name: cityName }
                }
            },
            relations: {
                stadium: { city: true },
                homeTeam: true,
                awayTeam: true
            }
        });
    }
}