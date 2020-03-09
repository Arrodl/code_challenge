const db = require('../models');
const config = require("../config/auth.config");
const Message = db.message;
const User = db.user;

exports.all = (req, res) => {
    Message.findAll({ order: db.sequelize.literal('id DESC'), limit: 50 }).then(messages => {
        
        res.send({
            messages
        });
    }).catch(e => {
        console.log(e);
        res.status(500).send({ message: "Internal server error" });
    })
};

exports.create = (req, res) => {
    Message.create({
        userId: req.body.user_id,
        body: req.body.body
    }).then(message => {
        res.send({
            success: Boolean(message)
        });
    }).catch(e => {
        res.status(500).send({ message: "Missing data" })
    })
};