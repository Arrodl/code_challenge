const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
let sequelize = null;
if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect:  'postgres',
        protocol: 'postgres',
        logging:  true //false
    });
} else {
    sequelize = new Sequelize(
        config.DB,
        config.USER,
        config.PASSWORD, {
            host: config.HOST,
            dialect: config.dialect,
            operatorsAliases: false,
            pool: {
                max: config.pool.max,
                min: config.pool.min,
                acquire: config.pool.acquire,
                idle: config.pool.idle
            },
            define: {
                freezeTableName: true,
                underscored: true
            }
        }
    );
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.message = require("../models/message.model.js")(sequelize, Sequelize);

db.message.belongsTo(db.user, {
    as: 'user'
});

module.exports = db;
