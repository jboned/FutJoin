'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

function saveUser(req, res){
    var user = new User();
    var params = req.body;

    //Obligatorios
    user.email = params.email.toLowerCase();
    user.nombre = params.nombre;


    user.tipo = 1; //Siempre que se registre un usuario, es tipo usuario normal

    //Opcionales
    user.fecha = params.fecha;
    user.telefono = params.telefono;
    user.codigoPostal = params.codigoPostal;
    
    //Futbol
    user.partidosJugados=0;
    user.piebueno = params.piebueno;
    user.posicion = params.posicion;
    user.altura = params.altura;

    //Imagen
    user.image = "wCtxANxebqR5RM8m6E5519nn.png";

    bcrypt.hash(params.password, null, null, function(err, hash){
        user.password = hash;
        user.save((err, userStored) =>{
            if(err){
                res.status(500).send({message:'Error al guardar usuario'});
            }else{
                res.status(200).send({user:userStored});
            }
        });
    });
}




function loginUser(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;
  

    User.findOne({email: email.toLowerCase()},(err,user)=>{
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!user){
                res.status(404).send({message:'El usuario no existe'});
            }else{
                bcrypt.compare(password,user.password, function(err, check){
                    if(check){
                        if(params.gethash){
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        }else{
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(404).send({message:'Contraseña incorrecta'})
                    }
                });
            }
        }
    });
}


function updateUser(req,res){
    var userId = req.params.id;
    var update = req.body; 
    
    if(userId != req.user.sub){
        return res.status(500).send({message:"No tienes permiso para actualizar este usuario"});
    }
    User.findOneAndUpdate(userId, update, (err,userUpdated) => {
        if(err){
            res.status(500).send({message:'Error al actualizar el usuario'});
        }else{
            res.status(200).send ({user:userUpdated});
        }
    });
}

function uploadImage(req,res){
    var userId = req.params.id;
    var file_name = 'No subido';
    
    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];
        
        var ext_split = file_name.split('.');
        var file_ext = ext_split[1];
        if(file_ext == 'png' || file_ext == 'jpg'){
            User.findByIdAndUpdate(userId,{image:file_name}, function(err,userUpdated){
                if(err){
                    res.status(500).send({message:'Error al actualizar el usuario'});
                }else{
                    
                    res.status(200).send({image: file_name, user: userUpdated});
                }
            });
        }else{
            res.status(404).send({message:'Extension no valida'});
        }

    }else{
        res.status(404).send({message: "No has subido ninguna imagen"});
    }
}

function getImageFile(req,res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/'+imageFile;
    fs.stat(path_file, function (err, stats) {
        if (err){
            res.status(200).send({message:'No existe la imagen'});
        } else {
            res.sendFile(path.resolve(path_file));
        }
    });
}

module.exports = {
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};