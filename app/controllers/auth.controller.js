const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
    User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        res.send({ user: {
            id: user.id,
            username: user.username
        }, });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
    User.findOne({ where: { username: req.body.username } }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400
        });

        res.status(200).send({
            user: {
                id: user.id,
                username: user.username
            },
            token
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};
