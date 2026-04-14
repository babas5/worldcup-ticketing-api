import {City} from "@domain/entities/City";
import {countries} from './countries.js';
import { Country } from "@domain/entities/Country.js";

export const cities = [
  new City(1, "Dallas", new Country(1, "USA", "us")), 
  new City(2, "Monterrey", new Country(2, "Mexico", "mx")), 
  new City(3, "Toronto", new Country(3, "Canada", "ca")) 
];