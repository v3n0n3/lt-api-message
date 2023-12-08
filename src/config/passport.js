const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const connection = require("../database/connection");
const User = require("../models/ObjectUser");

const customFields = {
    usernameFiled: "email",
    passwordField: "password"
}

const verifyCallback = (username, password, done) => {
   User.findOne({ where: { email: username } })
    .then((email)=>{

        if(!email)return done(null, false);

        const isValid = validPassword(password, user.hash, user.salt);

        if(isValid) {
            return done(null, user); // No error, yes user
        } else {
            return cb(null, false); // No error, no user
        }
     
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) =>{
    done(null, user.id)
});

passport.deserializeUser((userId, done)=>{
    User.findByPk(userId)
        .then((user)=>{
            done(null, user);
        })
        .catch(error => done(error))
});