/**
 * Importation des modules
 */
const { Sequelize, DataTypes} = require("sequelize");
const contactMessageModel = require("../models/ObjetMessage");

const connexion = new Sequelize(process.env.DATABASE_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DATABASE_IP_ADDRESS,
    dialect:"mysql"
});




/**
 */
const ContactMessage = contactMessageModel(connexion, DataTypes);


function getAllmessages(){
    console.log("Connexion à la base de données établie");
    console.log(process.env.DATABASE_IP_ADDRESS);
    ContactMessage.findAll().then((x)=>{
        console.log(x[1]);
    });
}


module.exports = { getAllmessages }