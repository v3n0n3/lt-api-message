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


async function getAllMessages(){

    const fetchData = await ContactMessage.findAll({
        attributes : ['name_firstname','email','message']
    });

    const allMessages = await fetchData.map( element => element.toJSON()); 

    console.log(allMessages);
    return allMessages;

    
}


module.exports = { getAllMessages }