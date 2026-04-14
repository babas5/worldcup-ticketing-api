import * as dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import {DataSource } from "typeorm";
import {Ticket} from "../../domain/entities/Ticket.js";
import {Match} from "../../domain/entities/Match.js";
import {Stadium} from "../../domain/entities/Stadium.js";
import {City} from "../../domain/entities/City.js";
import {Team} from "../../domain/entities/Team.js";
import {Country } from "../../domain/entities/Country.js";
import "reflect-metadata"; 

console.log("Tentative de connexion avec :", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  db: process.env.DB_NAME
});


export const AppDataSource = new DataSource({
    type: "mariadb",
    host: process.env.DB_HOST || "localhost", 
    port: Number(process.env.DB_PORT) || 3306, 
    username: process.env.DB_USER,            
    password: process.env.DB_PASSWORD,         
    database: process.env.DB_NAME,
    
    synchronize: true, 
    logging: false, 
    
    entities: [
        Ticket, 
        Match, 
        Stadium, 
        City, 
        Team, 
        Country
    ]
});