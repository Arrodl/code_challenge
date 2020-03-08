const express   = require('express');
const db        = require('./sequelize');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Edgewater markets');
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on port 3000!');
});


db.sequelize.sync().then(function() {
    http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
});