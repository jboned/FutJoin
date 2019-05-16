'use strict'

var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');
var jwt = require('../services/jwt');
var User = require('../models/user');
var ComplejoDeportivo = require('../models/complejodeportivo')

function saveComplejoDeportivo(req,res){
    var complejoDeportivo = new ComplejoDeportivo();
    var user = new User();
    let params = req.body;
    user.email = params.propietario.email.toLowerCase();
    user.nombre = params.propietario.nombre;
    user.tipo = 2;
    user.telefono = params.propietario.telefono;
    user.codigoPostal = params.propietario.codigoPostal;
    
    bcrypt.hash(params.propietario.password, null, null, function(err, hash){
        user.password = hash;
        user.save((err, userStored) =>{
            if(err){
                res.status(500).send({message:'Error al guardar usuario'});
            }else{
                user = userStored;
                res.status(200).send({user:userStored});
            }
        });
    });

    complejoDeportivo.propietario = user;
    complejoDeportivo.direccion = params.direccion;
    complejoDeportivo.save();
}

module.exports = {
    saveComplejoDeportivo
}