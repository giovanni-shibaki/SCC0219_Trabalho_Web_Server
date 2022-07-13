/*
  Giovanni Shibaki Camargo    Nusp: 11796444
  Lucas Keiti Anbo Mihara     Nusp: 11796472
*/

'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// Carrega as Rotas
const user = require('./routes/user');
const card = require('./routes/cards');

app.use(bodyParser.json({
    limit: '1mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/user', user);
app.use('/cards', card);
app.use(express.static('public'));

module.exports = app;