import express from 'express';
import http from 'http';
import path from 'path';

const app = express();
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', (req, res) => {
    res.send('Hello Edgewater markets');
});