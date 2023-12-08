
module.exports = (sequelize, DataTypes) => {
    return sequelize.define (
        "contact_messages",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name_firstname: {
                type: DataTypes.STRING(100)
            },
            email: {
                type: DataTypes.STRING(50)
            },
            message: {
                type : DataTypes.STRING(255)
            },
            ip: {
                type: DataTypes.STRING(15)
            }
        }
    )
}