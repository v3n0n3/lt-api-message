/**
 * Route permettant de lire tous les messages de contacte envoyé sur le site https://liattys.com
 * @param {*} application 
 */
module.exports = (application)=>{
    application.get("/all-messages", (req, res)=>{
        res.json(
            {
                messages : [
                    {
                        nom: "gérald",
                        message:"Salut"
                    },
                    {
                        nom: "aurélie",
                        message:"Salut"
                    }
                ]
            }
        );

    });
}