

module.exports = (sequelize,DataTypes) => {
    return sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100)
        },
        firstname: {
            type: DataTypes.STRING(100)
        },
        email: {
            type: DataTypes.STRING(50)
        },
        password: {
            type : DataTypes.STRING(255)
        }
    });
}