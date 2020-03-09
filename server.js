const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const http = require('http');
const WebSocket = require('ws');

const app = express();
var corsOptions = { origin: "http://localhost:3000" };
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
console.log(wss);
wss.on('connection', (ws) => {
    console.log("conne")
    ws.on('open', () => console.log("fsfs"))
    ws.on('close', () => console.log('Client disconnected'));
});
