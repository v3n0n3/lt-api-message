
/**
 * Chargement des variables d'environements
 */
require('dotenv').config()


/**
 * Chargement des différents modules
 */
const express = require("express");
const bcrypt = require("bcrypt");
const database = require("./src/database/connexion");
const routeTest = require("./src/routes/Test");
const routeAllMessages = require("./src/routes/MessageList");
const routeMessages= require("./src/routes/Message");
const passport = require('passport');
const passportConfig = require('./passport-config');


/**
 * Instanciation des objets et déclaration des variables
 */
const application = express();

application.use(express.json());
application.use(express.urlencoded({ extended: true })); // Pour les données de formulaire
//application.use();

//database.getAllmessages();


/**
 * Routes de l'application
 */
routeTest(application);

routeAllMessages(application, database);
routeMessages(application, database);

application.post("/check-password", async (req, res) => {
    const providedPassword = req.body.password; // Mot de passe fourni dans la requête
    const hashedPasswordFromDatabase = "hashed_password_from_database"; // Récupérez le mot de passe haché de la base de données

    try {
        const passwordMatch = await bcrypt.compare(providedPassword, hashedPasswordFromDatabase);

        if (passwordMatch) {
            res.status(200).send("Le mot de passe est correct !");
        } else {
            res.status(401).send("Le mot de passe est incorrect.");
        }
    } catch (error) {
        console.error("Erreur lors de la vérification du mot de passe :", error);
        res.status(500).send("Une erreur s'est produite lors de la vérification du mot de passe.");
    }
});

application.post("/register", async (req, res) => {
    try {
        // Générer un sel pour le hachage
        const saltRounds = 10;
        const salt =  await bcrypt.genSalt(saltRounds);

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        database.createUser({
            name: req.body.name.toLowerCase(),
            firstname: req.body.firstname.toLowerCase(),
            email: req.body.email.toLowerCase(),
            password: hashedPassword
        });

        res.status(201).json(
            {
                message: "Utilisateur enregistré avec succès !",
                status: 201
            });
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        res.status(500).json(
            {
                message: "Une erreur s'est produite lors de la création de l'utilisateur.",
                status: 500
            });
    }
});


application.use((req, res)=>{
    console.log("Route non valide appelée");
    res.status(404).json({message : "Aucune route ne correspond à votre demande", erreur: 404});
});

/**
 * Execution de l'application
 */
application.listen(process.env.SERVER_PORT, ()=>{
    console.log("Serveur démarré");
});