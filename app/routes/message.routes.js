const { authJwt } = require('../middleware');
const controller = require('../controllers/message.controller');

module.exports = (app) => {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/messages", [authJwt.verifyToken], controller.all);
    app.post("/messages", [authJwt.verifyToken], controller.create);
};