import {Stadium} from "@domain/entities/Stadium";
import {cities} from './cities.js';

export const stadiums = [
  new Stadium("AT&T Stadium", cities[0], 70122), 
  new Stadium("Monterrey Estadio BBVA", cities[1], 50113), 
  new Stadium("BMO Field", cities[2], 45000) 
];