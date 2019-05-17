'use strict'

var Noticia = require('../models/noticias')

function getNoticias(req,res){
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }
    
    var itemsPerPage = 10;
    Noticia.find().paginate(page, itemsPerPage, function(err, noticias, total){
        if(err){
            res.status(500).send({message:"Error en la peticion"});
        }else{
            if(!noticias){
                res.status(500).send({message:"No hay noticias"});
            }else{
                return res.status(200).send({
                    pages:total,
                    noticias:noticias
                });
            }
        }
    });
}

function saveNoticia(req,res){
    var noticia = new Noticia();
    var message = req.params.message;
    noticia.message = message;
    noticia.fecha = new Date();
    noticia.save((err,noticiaStored)=>{
        if(err){
            res.status(500).send({message:'Error al guardar noticia'});
        }else{
            res.status(200).send({user:noticiaStored});
        }

    });
}

function deleteNoticia(req,res){
    var noticiaId = req.params.id;

    Noticia.findByIdAndRemove(noticiaId, (err,noticiaEliminada) =>{
        if(err){
            res.status(500).send({message:"Error en la peticion"});
        }else{
            if(!nnoticiaEliminada){
                res.status(500).send({message:"No se ha eliminado la noticia"});
            }else{
                res.status(200).send({message:"Noticia eliminada con exito."})
            }
        }
    });
}

module.exports = {
    getNoticias,
    deleteNoticia
}
