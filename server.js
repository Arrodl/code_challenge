const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const Message = db.message;
const http = require('http');
const https = require('https');
const { Server } = require('ws');
const fs = require('fs');
const request = require('request');

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
        const data = JSON.parse(message);
        // Check if command
        if (data.command) {
            // const url = `http://stooq.com/q/l/?s=${data.command}&f=sd2t2ohlcv&h&e=csv`;
            // const file = fs.createWriteStream("file.jpg");
            // const request = https.get(url, function(response) {
            //     response.pipe(file);
            // });
            // console.log(request);
            ws.send(JSON.stringify({
                id: 'stock',
                body: "APPL.US quote is $93.42 per share”."
            }));
        } else {
            //log the received message and send it back to the client
            Message.create(data).then(res => {
                ws.send(JSON.stringify(res));
            });
        }
    });

    //send immediatly a feedback to the incoming connection    
    ws.send(JSON.stringify({ id: 'bot', body: "Welcome to this chatroom!" }));
});

//start our server
server.listen(process.env.PORT || 8080, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});