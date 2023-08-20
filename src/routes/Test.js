
module.exports = (application)=>{
    console.log("Hello World");
    application.get("/", (req, res)=>{
        res.json({
            message: "Test validé"
        });
    });
}