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

function uploadImageCampo(req,res){
    var campoId = req.params.id;
    var file_name = 'No subido';
    
    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];
        
        var ext_split = file_name.split('.');
        var file_ext = ext_split[1];
        if(file_ext == 'raw' || file_ext == 'tif' || file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || fiel_ext=='bmp'){
            User.findByIdAndUpdate(campoId,{image:file_name}, function(err,campoUpdated){
                if(err){
                    res.status(500).send({message:'Error al actualizar imagen de Campo'});
                }else{
                    
                    res.status(200).send({image: file_name, campo: campoUpdated});
                }
            });
        }else{
            res.status(500).send({message:'Extension no valida'});
        }

    }else{
        res.status(404).send({message: "No has subido ninguna imagen"});
    }
}

function getImageFileCampo(req,res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/campos/'+imageFile;
    fs.stat(path_file, function (err, stats) {
        if (err){
            res.status(200).send({message:'No existe la imagen'});
        } else {
            res.sendFile(path.resolve(path_file));
        }
    });
}

 
module.exports = {
    getCampos,
    saveCampo,
    uploadImageCampo,
    getImageFileCampo

}