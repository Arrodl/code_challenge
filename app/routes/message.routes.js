const { authJwt } = require('../middleware');
const controller = require('../controllers/message.controller');

module.exports = (app) => {
    app.get("/messages", [authJwt.verifyToken], controller.all);
    app.post("/messages", [authJwt.verifyToken], controller.create);
};