const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const connection = require("../database/connection");
const User = require("../models/ObjectUser");

const customField = {
    usernameFiled: "email",
    passwordField: "password"
}

const verifyCallback = (username, password, done) => {
   
    
    

};

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));