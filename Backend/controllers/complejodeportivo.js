'use strict'

var fs = require('fs');
var path = require('path');

var user = require('../models/user');
var complejoDeportivo = require('../models/complejodeportivo')

function saveComplejoDeportivo(req,res){
    var complejoDeportivo = new complejoDeportivo();

    let params = req.body();
    complejoDeportivo.user = params.user;
    complejoDeportivo.direccion = params.direccion;
}

module.exports = {
    saveComplejoDeportivo
}