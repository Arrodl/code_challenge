const express   = require('express');
const http      = require('http');
const path      = require('path');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Edgewater markets');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});