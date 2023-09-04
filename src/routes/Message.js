module.exports = (application, database) => {
    // type the code here dudilol of the deadidead
    application.get("/api/message/:messageId", (req, res)=>{
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
}