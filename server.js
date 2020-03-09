const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const http = require('http');
const { Server } = require('ws');

const app = express();
var corsOptions = { origin: "*" };
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connectedUsers = [];

const initial = () => {};

// TODO: Remove forse for production
db.sequelize.sync({ force: false }).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

app.get("/home", (req, res) => {
    res.json({ message: "Edgewater Markets." });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/message.routes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const wss = new WebSocket.Server({ server: app });

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
    wss.clients.forEach((client) => {
      client.send(new Date().toTimeString());
    });
}, 1000);