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
 
module.exports = {
    getCampos

}