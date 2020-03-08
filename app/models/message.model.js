module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("messages", {
        body: Sequelize.STRING
    });
  
    return Message;
};