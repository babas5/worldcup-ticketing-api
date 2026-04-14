import {ILike, Repository} from "typeorm";
import {Country} from "../../domain/entities/Country";
import {City} from "../../domain/entities/City";
import {NotFoundError} from "../../domain/errors/NotFoundError";

export class CountryService {
    constructor(
        private readonly countryRepository: Repository<Country>,
        private readonly cityRepository: Repository<City>
    ) {}

        // Liste tous les pays, avec possibilité de filtrer par nom
    public async findAll(name?: string): Promise<Country[]> {
        const where = name ? { name: ILike(name) } : {};
        return await this.countryRepository.find({ where });
    }

        // Récupère un pays via son code (ex: "fr", "us", "sn") 
    public async findByCode(code: string): Promise<Country> {
        const country = await this.countryRepository.findOneBy({ 
            code: ILike(code) 
        });

        if (!country) {
            throw new NotFoundError(`Le pays avec le codé '${code}' n'existe pas`);
        }
        return country;
    }

        // Renvoie toutes les villes liées à un pays spécifique (de par son code pays)
    public async findCitiesByCountryCode(code: string): Promise<City[]> {
        const country = await this.countryRepository.findOneBy({ 
            code: ILike(code) 
        });

        if (!country) {
            throw new NotFoundError(`Le pays avec le codé '${code}' n'existe pas`);
        }

            // Ici on filtre les villes en utilisant l& relation avec l'entité Country
        return await this.cityRepository.find({
            where: { country: { code: ILike(code) } },
            relations: { country: true }
        });
    }
}