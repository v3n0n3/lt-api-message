
/**
 * Chargement des variables d'environements
 */
require('dotenv').config()


/**
 * Importing modules
 */
const path = require("path");
const express = require("express");
const session = require("express-session");
const router = require("./src/routes/index");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const {Sequelize, DataType } = require("sequelize");
const bcrypt = require("bcrypt");
const database = require("./src/database/connection");
const passport = require('passport');



/**
 * Express instance && config
 */
const application = express();

application.set("views", path.join(__dirname, 'views'));
application.set("view engine", "html");

application.use(express.json());
application.use(express.urlencoded({ extended: true })); // Pour les données de formulaire
application.use(session({
    secret : process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: database.connection
    }),
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
    }
}));

/**
 * Authentication middleware
 */
require("./src/config/passport");
application.use(passport.initialize());
application.use(passport.session());


/**
 * Route of the application
 */
application.use(router(database));

/**
 * Execution de l'application
 */
application.listen(process.env.SERVER_PORT, ()=>{
    console.log("Serveur démarré");
});