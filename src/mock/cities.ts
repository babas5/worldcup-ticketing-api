import { City } from "@domain/entities/City";
import { countries } from './countries.js';

export const cities = [
  new City("Dallas", countries[0]), 
  new City("Monterrey", countries[1]), 
  new City("Toronto", countries[2]) 
];