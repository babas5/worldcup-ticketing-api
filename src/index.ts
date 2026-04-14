import "reflect-metadata";
import {serve} from "@hono/node-server"; 
import {AppDataSource } from "@infrastructure/database/AppDataSource";
import {app} from "@infrastructure/app";

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Base de données connectée");
    
    serve({
      fetch: app.fetch,
      port: port
    });

    console.log(`Démarrage du serveur sur le port ${port}`);
  })
  .catch((err) => {
    console.error("Zrreur : Impossible de se connecter à la base de données", err);
    process.exit(1);
  });
 