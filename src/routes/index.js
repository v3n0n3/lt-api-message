const  path = require("path");
const router = require("express").Router();
const passport = require("passport");
const { passwordGeneration } = require("../utilities/uti_password");
const passwordUtilities = require("../utilities/uti_password");

module.exports = (database) => {
    router.get("/", (req, res)=>{
        res.send(`
        <h1>Test route of the web service</h1>
        <p>To use the web service you must be registered -> <a href="/register">register here</a> <- </p>
        `);
    });

    router.get("/api/login", (req, res)=>{
        res.sendFile("login.html", 
            { root: path.join(__dirname, '../views') 
        });
    });

    router.get("/api/register", (req, res)=>{

        res.sendFile("register.html", 
            { root: path.join(__dirname, '../views') 
        });
    });


    router.post("/api/register", async (req, res) => {
        // Creatation of a new user
        // -> Some check to add
        const newUser = {
            name: req.body.name,
            firstname: req.body.firstname,
            email: req.body.email,
            password: await passwordUtilities.passwordHash(req.body.password)
        };

        console.log(newUser.password);

        database.createUser(newUser);
     

        res.sendFile("login.html", 
            { root: path.join(__dirname, '../views') 
        });

        

    })

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

    //router.post("login", passport.authenticate("local"), (req, res, next) =>{
    //});

    return router;

}
