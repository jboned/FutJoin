'use strict'

var Noticia = require('../models/noticias')

function getNoticias(req,res){
    Noticia.find(function (err, noticias) {
        if(err){
            res.status(500).send({message:"Error en la peticion"});
        }else{
            if(!noticias){
                res.status(500).send({message:"No hay noticias"});
            }else{
                return res.status(200).send({noticias:noticias});
            }
        }

    }).sort({fecha:-1})
   
}

function saveNoticia(mensaje,tipo){
    var noticia = new Noticia();
    noticia.mensaje = mensaje;
    noticia.fecha = new Date();
    noticia.tipo = tipo;
    noticia.save();
}


module.exports = {
    getNoticias,
    saveNoticia
}
