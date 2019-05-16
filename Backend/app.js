'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//carga rutas
var user_routes = require('./routes/user');
var complejo_routes = require('./routes/complejodeportivo');


//configurar cabeceras http
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas base
app.use('/api',user_routes);
app.use('/api',complejo_routes);
app.use(cors());

module.exports = app;