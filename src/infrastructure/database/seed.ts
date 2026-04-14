import "reflect-metadata";
import {AppDataSource} from "./AppDataSource";
import {Country} from "@domain/entities/Country";
import {City } from "@domain/entities/City";
import {Stadium } from "@domain/entities/Stadium";
import {Team} from "@domain/entities/Team";
import {Match } from "@domain/entities/Match";
import {Ticket } from "@domain/entities/Ticket";
import {countries} from "@infrastructure/mock/countries";
import {cities} from "@infrastructure/mock/cities";
import {stadiums} from "@infrastructure/mock/stadiums";
import {teams} from "@infrastructure/mock/teams";
import {matchs} from "@infrastructure/mock/matchs";
import {tickets} from "@infrastructure/mock/tickets";

async function clear(): Promise<void> {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const ticketRepository = AppDataSource.getRepository(Ticket);
    const matchRepository = AppDataSource.getRepository(Match);
    const teamRepository = AppDataSource.getRepository(Team);
    const stadiumRepository = AppDataSource.getRepository(Stadium);
    const cityRepository = AppDataSource.getRepository(City);
    const countryRepository = AppDataSource.getRepository(Country);

    await AppDataSource.query("SET FOREIGN_KEY_CHECKS = 0;");

    await ticketRepository.clear();
    await matchRepository.clear();
    await teamRepository.clear();
    await stadiumRepository.clear();
    await cityRepository.clear();
    await countryRepository.clear();

    await AppDataSource.query("SET FOREIGN_KEY_CHECKS = 1;");

    await AppDataSource.destroy();
    console.log("Base de données vidée");
  } catch (error) {
    console.error(error);
    console.error("Impossible de vider la base de données");
  }
}

async function seed(): Promise<void> {
  try {
    await clear();

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const countryRepo = AppDataSource.getRepository(Country);
    const cityRepo = AppDataSource.getRepository(City);
    const stadiumRepo = AppDataSource.getRepository(Stadium);
    const teamRepo = AppDataSource.getRepository(Team);
    const matchRepo = AppDataSource.getRepository(Match);
    const ticketRepo = AppDataSource.getRepository(Ticket);

    for (const country of countries) {
      await countryRepo.save(countryRepo.create(country));
    }
    console.log("Pays insérés");

    for (const city of cities) {
      await cityRepo.save(cityRepo.create(city));
    }
    console.log("Villes insérées");

    for (const stadium of stadiums) {
      await stadiumRepo.save(stadiumRepo.create(stadium));
    }
    console.log("Stades insérés");

    for (const team of teams) {
      await teamRepo.save(teamRepo.create(team));
    }
    console.log("Equipes insérées");

    for (const match of matchs) {
      await matchRepo.save(matchRepo.create(match));
    }
    console.log("Matchs insérés");

    for (const ticket of tickets) {
      await ticketRepo.save(ticketRepo.create(ticket));
    }
    console.log("Tickets insérés");

    await AppDataSource.destroy();
    console.log("Seed de la base de données terminé");
  } catch (error) {
    console.error(error);
  }
}

seed().then(() => {
  process.exit(0);
});