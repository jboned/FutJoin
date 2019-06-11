'use strict'

var fs = require('fs');
var path = require('path');
var User = require('../models/user');
var Campo = require('../models/campo');
var Complejo = require('../models/complejodeportivo');
var Noticia = require('../controllers/noticias');


function getCampos(req,res){
    let params = req.body;
    let tipo = params.tipo;
    let idcomplejo = params.idcomplejo;

    let find= Campo.find({tipo:tipo,complejo:idcomplejo});
    find.populate({
        path:'complejo',
        populate: {
            path:'propietario',
            model:'User',
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

function getCampoById(req,res){
    let id = req.body.id;
    let find = Campo.findById(id);
    find.populate({
        path:'complejo',
        populate: {
            path:'propietario',
            model:'User',
        },
        model:'ComplejoDeportivo',
    }).exec(function(err,campo){
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!campo){
                res.status(500).send({message:'No existe el campo'});
            }else{
                res.status(200).send({campo:campo});
            }
        }
    });
}

function updateCampo(req,res){
    var campoId = req.params.id;
    var userId = req.params.user_id;
    var update = req.body;

    
    if(userId != req.user.sub){
        return res.status(500).send({message:"No tienes permiso para actualizar este usuario"});
    }

    Campo.findByIdAndUpdate(campoId, update, (err,campoUpdated) => {
        if(err){
            res.status(500).send({message:'Error al actualizar el campo'});
        }else{
            res.status(200).send ({campo:campoUpdated});
        }
    });
    
}

function saveCampo(req,res){
    let params = req.body;
    let campo = new Campo();

    let complejo = new Complejo();
    complejo = params.complejo;

    let user = new User();
    user = params.complejo.propietario;
    
    campo.nombre = params.nombre;
    campo.largo = params.largo;
    campo.ancho = params.ancho;
    campo.superficie = params.superficie;
    campo.aforoGrada = params.aforoGrada;
    campo.sistemaIluminacion = params.sistemaIluminacion;
    
    campo.complejo = new Complejo();
    campo.complejo = complejo;

    campo.complejo.propietario = new User();
    campo.complejo.propietario = user;

    console.log(complejo);
    campo.tipo = params.tipo;
    campo.image = "wCtxANxebqR5RM8m6E5519nn.png";
    
    campo.save((err, campoGuardado)=> {
        if(err){
            res.status(500).send({message:'El email de usuario ya existe.'});
        }else{
            res.status(200).send({campo:campoGuardado});
            Noticia.saveNoticia("El complejo "+complejo.propietario.nombre + " ha creado el campo "+campo.nombre ,2);
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
            Campo.findByIdAndUpdate(campoId,{image:file_name}, function(err,campoUpdated){
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
    getImageFileCampo,
    getCampoById,
    updateCampo

}