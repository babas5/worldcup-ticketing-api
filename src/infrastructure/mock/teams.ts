import {Team} from "@domain/entities/Team";
import { FifaCode } from "@domain/entities/FifaCode.js";

export const teams = [
  new Team(1, "France", new FifaCode("FRA").getValue()),
  new Team(2, "Sénégal", new FifaCode("SEN").getValue()),
  new Team(3, "Brésil", new FifaCode("BRA").getValue()),
  new Team(4, "Jordanie", new FifaCode("JOR").getValue()),
  new Team(5, "Espagne", new FifaCode("ESP").getValue()),
  new Team(6, "Nouvelle-Zélande", new FifaCode("NZL").getValue())
];