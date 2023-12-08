const  path = require("path");
const router = require("express").Router();
const passport = require("passport");
const passwordUtilities = require("../utilities/uti_password");

module.exports = (database) => {

    router.get("/", (req, res)=>{
        console.log(req.session);
        res.send(`
        <h1>Test route of the web service</h1>
        <p>To use the web service you must be registered -> <a href="/register">register here</a> <- </p>
        `);
    });

    router.get("/login", (req, res)=>{
        res.sendFile("login.html", 
            { root: path.join(__dirname, '../views') 
        });
    });

    router.get("/register", (req, res)=>{
        res.sendFile("register.html", 
            { root: path.join(__dirname, '../views') 
        });
    });

    router.get("/api/messages-liste", (req, res)=>{
        try {
            database.getAllMessages().then( allMessages => {
                    res.status(200).json({
                        status: 200,
                        message : "Requête réussie",
                        data : allMessages
                    });
                }
            );
            
        } catch (error) {
            res.status(500).json({
                status: 500,
                message : "Une erreur lors de la requête est survenue, veuillez réesayer plus tard",
                error : error.message
            });
        }
    });


    router.get("/api/message/:messageId", (req, res)=>{
        console.log(req.params.messageId);
        try{

        database.getMessageById(req.params.messageId).then(message => {
        res.status(200).json({
                status: 200,
                message : "Requête réussie",
                data : message
        }) 
        });
        }catch (error) {
            res.status(500).json({
                status: 500,
                message : "Une erreur lors de la requête est survenue, veuillez réesayer plus tard",
                error : error.message
            });
        }
    });

    router.post("login", passport.authenticate("local"), (req, res, next) =>{

    });

    return router;

}
