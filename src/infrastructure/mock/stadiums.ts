import {Stadium} from "@domain/entities/Stadium";
import {cities} from './cities.js';

export const stadiums = [
  new Stadium(1, "AT&T Stadium", cities[0], 70122), 
  new Stadium(2, "Monterrey Estadio BBVA", cities[1], 50113), 
  new Stadium(3, "BMO Field", cities[2], 45000) 
];