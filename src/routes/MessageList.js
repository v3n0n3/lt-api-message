/**
 * Route permettant de lire tous les messages de contacte envoyé sur le site https://liattys.com
 * @param {*} application 
 */
module.exports = (application, database)=>{
    application.get("/api/messages-liste", (req, res)=>{
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
}