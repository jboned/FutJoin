'use strict'

var fs = require('fs');
var path = require('path');

var user = require('../models/user');
var complejoDeportivo = require('../models/complejodeportivo')

function saveComplejoDeportivo(req,res){
    var complejoDeportivo = new complejoDeportivo();
    var user = new User();

    let params = req.body();
    user.email = params.email.toLowerCase();
    user.nombre = params.nombre;
    user.tipo = 2;
    user.telefono = params.telefono;
    user.codigoPostal = params.codigoPostal;
    user.image = "wCtxANxebqR5RM8m6E5519nn.png";
    bcrypt.hash(params.password, null, null, function(err, hash){
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

    complejoDeportivo.user = user;
    complejoDeportivo.direccion = params.direccion;
    complejoDeportivo.save((err, complejoDeportivoStored) =>{
        if(err){
            res.status(500).send({message:'Error al guardar complejo'});
        }else{
            user = userStored;
            res.status(200).send({complejoDeportivo:complejoDeportivoStored);
        }
    });

}

module.exports = {
    saveComplejoDeportivo
}