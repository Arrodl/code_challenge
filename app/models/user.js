module.exports = (sequelize, DataTypes) => {
    // console.log(DataTypes)
    return sequelize.define("users", {
        username: DataTypes.STRING
    });
};