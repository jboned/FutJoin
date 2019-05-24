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
    user.image = "wCtxANxebqR5RM8m6E5519nn.png";
    
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

function getComplejosDeportivo(req,res){
     let find = ComplejoDeportivo.find({});
     find.populate({
         path:'propietario',
         model:'User',
     }).exec(function(err, complejos){
         if(err){
             res.status(500).send({message: 'Error en la peticion'});
         }else{
             if(!complejos){
                 res.status(404).send({message:'No hay complejos'});
             }else{
                 complejos = complejos.filter(function(complejo){
                     return complejo.propietario;
                  });
                  
                 res.status(200).send({complejos});
             }
         }
     });
}

function getOneComplejoDeportivo(req,res){
    let find = ComplejoDeportivo.findById(req.body.id);
    find.populate({
        path:'propietario',
        model:'User',
    }).exec(function(err, complejo){
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!complejo){
                res.status(404).send({message:'No existe complejo con ese id'});
            }else{
                res.status(200).send({complejo});
            }
        }
    });
}

module.exports = {
    saveComplejoDeportivo,
    getComplejosDeportivo,
    getOneComplejoDeportivo

}