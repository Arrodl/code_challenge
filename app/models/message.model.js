module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("messages", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        body: Sequelize.STRING
    });
  
    return Message;
};