if (!global.hasOwnProperty('db')) {
    const Sequelize = require('sequelize');
    let sequelize = null;
  
    if (process.env.DATABASE_URL) {
        sequelize = new Sequelize(process.env.DATABASE_URL, {
            dialect:  'postgres',
            protocol: 'postgres',
            port:     match[4],
            host:     match[3],
            logging:  true //false
        });
    } else {
        sequelize = new Sequelize('stakc', null, null, {
            host: 'localhost',
            dialect: 'postgres',
            protocol: 'postgres'
        });
    }
  
    global.db = {
        Sequelize:  Sequelize,
        sequelize:  sequelize,
        User:       sequelize.import(`${__dirname}/models/user`)
    }
  
    /*
      Associations can be defined here. E.g. like this:
      global.db.User.hasMany(global.db.SomethingElse)
    */
  }
  
  module.exports = global.db