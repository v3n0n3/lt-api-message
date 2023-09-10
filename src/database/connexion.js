/**
 * Importation des modules
 */
const { Sequelize, DataTypes} = require("sequelize");
const contactMessageModel = require("../models/ObjetMessage");
const userModel = require("../models/ObjectUser");

const connexion = new Sequelize(process.env.DATABASE_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DATABASE_IP_ADDRESS,
    dialect:"mysql"
});


// Modeles sequelize instanciés
const ContactMessage = contactMessageModel(connexion, DataTypes);
const User = userModel(connexion, DataTypes);


/**
 * Décommanter pour syncronisere les tables
 */
//User.sync();


async function getAllMessages(){
    try {
        const fetchData = await ContactMessage.findAll({
            attributes : ['name_firstname','email','message']
        });

        const allMessages = await fetchData.map( element => element.toJSON()); 

        return allMessages;
    } catch (error){
        return { 
            status: 500,
            message : "Erreur lors de la requête, veuillez réesayer ulterieurement",
            error: error.message
        }
    }
}

async function getMessageById(id){
    try {
        const fetchData = await ContactMessage.findByPk(id, {
            attributes : ['name_firstname','email','message']
        });
        return fetchData.toJSON();
    } catch (error) {
        return { 
            status: 500,
            message : "Erreur lors de la requête, veuillez réesayer ulterieurement",
            error: error.message
        }
    } 
}

async function createUser(user){
    try{
        User.create(user);
    } catch (error) {
        return { 
            status: 500,
            message : "Erreur lors de la requête, veuillez réesayer ulterieurement",
            error: error.message
        }
    } 
}

module.exports = { getAllMessages, getMessageById, createUser }