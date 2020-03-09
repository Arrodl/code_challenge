const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const Message = db.message;
const http = require('http');
const { Server } = require('ws');

const app = express();

var corsOptions = { origin: "http://localhost:3000" };
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

const initial = () => {};

// TODO: Remove forse for production
db.sequelize.sync({ force: false }).then(() => {
    initial();
});

require('./app/routes/auth.routes')(app);
require('./app/routes/message.routes')(app);

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new Server({ server });

wss.on('connection', (ws) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {

        //log the received message and send it back to the client
        Message.create(message).then(res => {
            ws.send(res);
        });
    });

    //send immediatly a feedback to the incoming connection    
    ws.send({ id: 'bot', body: "Welcome to this chatroom!" });
});

//start our server
server.listen(process.env.PORT || 8080, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});