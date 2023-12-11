const bcrypt = require("bcrypt");

function passwordHash(password){
    return bcrypt.hash(password, 10);
}


function passwordMatch(passwordEntered, databaseHash){
    return passwordEntered == databaseHash;
}

module.exports = {
    passwordHash,
    passwordMatch
}