/**
 * Module import
 */
const { Sequelize, DataTypes} = require("sequelize");
const contactMessageModel = require("../models/ObjetMessage");
const userModel = require("../models/ObjectUser");

const connection = new Sequelize(
    process.env.DATABASE_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD,
    {
        host: process.env.DATABASE_IP_ADDRESS,
        dialect:"mysql",
    }
);

/*
connection
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((err) => {
            console.log('Unable to connect to the database:', err);
        });

*/

// Sequelize model instances
const ContactMessage = contactMessageModel(connection, DataTypes);
const User = userModel(connection, DataTypes);


/**
 * @-> To sync sequelize models
 * <!> La sync 05/08/2023
 */
//ContactMessage.sync();
//User.sync();


async function getAllMessages(){
    // Return all contact messages
    try {
        const fetchData = await ContactMessage.findAll({
            attributes : ['name_firstname','email','message']
        });

        const allMessages = await fetchData.map( element => element.toJSON()); 

        return allMessages;
    } catch (error){
        return { 
            status: 500,
            message : "Error during the request, please try later",
            error: error.message
        }
    }
}

async function getMessageById(id){
    // Return a message by id
    try {
        const fetchData = await ContactMessage.findByPk(id, {
            attributes : ['name_firstname','email','message']
        });
        return fetchData.toJSON();
    } catch (error) {
        return { 
            status: 500,
            message : "Error during the request, please try later",
            error: error.message
        }
    } 
}

async function createUser(user){

    try{
        const newUser = await User.findOne(
            {
                where: {
                    email: user.email
                }
            }
        );

        if (!newUser){
            User.create(user);
            return {
                status: 201,
                message : `The user ${user.firstname} ${user.name} have been created`,
            }
        } else {
            console.log("User does not exist");
        }
        
    } catch (error) {
        return { 
            status: 500,
            message : "Error during the request, please try later",
            error: error.message
        }
    } 
}

module.exports = { connection, getAllMessages, getMessageById, createUser }