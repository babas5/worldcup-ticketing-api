import { z } from 'zod';


export const CreateTicketSchema = z.object({
  
  matchId: z.number().int().positive(), //entier strictement positif

  seat: z.string().min(1).max(10), //chaine 1 à 10 char

  customer: z.object({

    firstname: z.string().min(1), // chaîne d'au moins 1 caractère 

    lastname: z.string().min(1),  // chaîne d'au moins 1 caractère 

    email: z.string().email(), // chaîne de caractères et adresse e-mail valide 
  }),
});