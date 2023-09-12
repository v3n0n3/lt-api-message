module.exports = (application, database) => {

    application.post("/login", (req, res, next) =>{
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
              // S'il y a une erreur ou si l'authentification échoue,
              // nous appelons next(err) pour transmettre l'erreur au middleware de gestion des erreurs.
              return next(err);
            }
        
            req.login(user, { session: false }, (err) => {
              if (err) {
                // Encore une fois, si une erreur se produit lors de la connexion de l'utilisateur,
                // nous utilisons next(err) pour gérer l'erreur.
                return next(err);
              }
        
              const token = info.token;
              return res.json({ token });
            });
          })(req, res);
    });
    
}