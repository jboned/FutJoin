'use strict'

var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');
var jwt = require('../services/jwt');
var User = require('../models/user');
var Campo = require('../models/campo')


function getCampos(req,res){
    let tipo = req.params.tipo;
    let find= Campo.find({tipo:tipo});
    find.populate({
        path:'complejo',
        populate: {
            path:'propietario',
            model:'User'
        },
        model:'ComplejoDeportivo',
    }).exec(function(err,campos){
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!campos){
                res.status(500).send({message:'No hay campos'});
            }else{
                res.status(200).send({campos:campos});
            }
        }
    });
}

function saveCampo(req,res){
    let params = req.body;
    let campo = new Campo();
    campo.nombre = params.nombre;
    campo.largo = params.largo;
    campo.ancho = params.ancho;
    campo.superficie = params.superficie;
    campo.aforoGrada = params.aforoGrada;
    campo.sistemaIluminacion = params.sistemaIluminacion;
    campo.complejo = params.complejo;
    campo.image = "wCtxANxebqR5RM8m6E5519nn.png";
    campo.save((err, campoStored) =>{
        if(err){
            res.status(500).send({message:'Ya existe ese campo'});
        }else{
            res.status(200).send({campo:campoStored});
        }
    });
}
 
module.exports = {
    getCampos,
    saveCampo

}