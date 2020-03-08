const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const http = require('http');
const WebSocket = require('websocket');

const app = express();
var corsOptions = { origin: "http://localhost:3000" };
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connectedUsers = [];

// const server = http.createServer(app);
// server.listen(1337, 'localhost', 0, () => {});
// const wws = new WebSocket.server({
//     httpServer: server,
    
// });

// wws.on('request', (ws) => {
    
//     ws.send({ body: "Hola" });

// });

const initial = () => {};

// TODO: Remove forse for production
db.sequelize.sync({ force: false }).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

app.get("/", (req, res) => {
    res.json({ message: "Edgewater Markets." });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/message.routes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
