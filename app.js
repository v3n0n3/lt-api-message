
/**
 * Chargement des variables d'environements
 */
require('dotenv').config()


/**
 * Chargement des différents modules
 */
const express = require("express");
const database = require("./src/database/connexion");
const routeTest = require("./src/routes/Test");
const routeAllMessages = require("./src/routes/MessageList");


/**
 * Instanciation des objets et déclaration des variables
 */
const application = express();

database.getAllmessages();


/**
 * Routes de l'application
 */
//routeTest(application);

routeAllMessages(application);

application.use((req, res)=>{
    res.status(404).json({message : "Aucune route ne correspond à votre demande", erreur: 404});
});

/**
 * Execution de l'application
 */
application.listen(process.env.SERVER_PORT, ()=>{
    console.log("Serveur démarré");
});