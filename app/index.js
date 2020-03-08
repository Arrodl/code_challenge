const express   = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Edgewater markets');
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on port 3000!');
});