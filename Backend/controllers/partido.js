'use strict'


var Partido = require('../models/partido');
var Campo = require('../models/campo');
var Complejo = require('../models/complejodeportivo');
var User = require('../models/user');
var Noticia = require('../controllers/noticias');

function savePartido(req,res){
    let params = req.body;
    let partido = new Partido();

    //Creador de distintas clases.
    let campo = new Campo();
    campo = params.campo;

    let complejo = new Complejo();
    complejo = params.campo.complejo;

    let user = new User();
    user = params.campo.complejo.propietario;

    let creador = new User();
    creador = params.creador;

    let jugadores = new Array(User);
    jugadores = params.jugadores;

    //Parametros partido
    //console.log(params.dia);
    let dia = params.dia.split("/");

    dia = new Date(dia[2],dia[1]-1,dia[0]);
    dia.setMinutes(dia.getMinutes()-(dia.getTimezoneOffset()));
    partido.dia = dia;
    partido.tipo = params.tipo;
    partido.fechaInicio = params.fechaInicio;
    partido.fechaInicio.setHours(partido.fechaInicio.getHours()+2);

    partido.fechaFin = params.fechaFin; 
    partido.fechaFin.setHours(partido.fechaFin.getHours()+2);

    partido.maxJugadores = params.maxJugadores; 
    partido.terminado = 0;

    //Creador clases dentro de partido.
    partido.campo = new Campo();
    partido.campo = campo;

    partido.campo.complejo = new Complejo();
    partido.campo.complejo = complejo;

    partido.campo.complejo.propietario = new User();
    partido.campo.complejo.propietario = user;

    partido.creador = new User();
    partido.creador = creador;

    partido.jugadores = new Array(User);
    partido.jugadores = jugadores;

    partido.save((err, partidoGuardado)=> {
        if(err){
            res.status(500).send({message:'Error al guardar partido.'});
        }else{
            res.status(200).send({partido:partidoGuardado});
        }
    });
}

function getPartidosByFecha(req,res){
    let params = req.body;
    
    let fechaInicio = params.fechaInicio.split("/");
    fechaInicio = new Date(fechaInicio[2],fechaInicio[1]-1,fechaInicio[0]);
    fechaInicio.setMinutes(fechaInicio.getMinutes()-(fechaInicio.getTimezoneOffset()));
    
    let fechaFin = params.fechaFin.split("/");
    fechaFin = new Date(fechaFin[2],fechaFin[1]-1,fechaFin[0]);
    fechaFin.setMinutes(fechaFin.getMinutes()-(fechaFin.getTimezoneOffset()));
    
    let campoid = params.campoid;

   let find = Partido.find({
        dia: {
            $gte: fechaInicio,
            $lte: fechaFin
        },
        campo:campoid
    });
    find.populate({
        path:'campo',
        populate: {
            path:'complejo',
            populate:{
                path:'propietario',
                model:'User'
            },
            model:'ComplejoDeportivo',
        },
        model:'Campo',
    });
    find.populate({
        path:'creador',
        model:'User'
    });
    find.populate({
        path:'jugadores',
        model:'User'
    }).sort({fechaInicio:1}).exec(function(err,partidos){
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!partidos){
                res.status(500).send({message:'No hay partidos'});
            }else{
                res.status(200).send({partidos:partidos});
            }
        }
    });
}

function getPartidoByJugadorParticipante(req,res){
    let params = req.body;
    let id = params.id;
    

   let find = Partido.find({
        jugadores: id,
        terminado: 0,
        creador : {$ne : id}
        
    });
    find.populate({
        path:'campo',
        populate: {
            path:'complejo',
            populate:{
                path:'propietario',
                model:'User'
            },
            model:'ComplejoDeportivo',
        },
        model:'Campo',
    });
    find.populate({
        path:'creador',
        model:'User'
    });
    find.populate({
        path:'jugadores',
        model:'User'
    }).sort({fechaInicio:1}).exec(function(err,partidos){
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            res.status(200).send({partidos:partidos});
        }
    });
}

function getPartidoByJugadorCreador(req,res){
    let params = req.body;
    let id = params.id;

   let find = Partido.find({
        creador: id,
        terminado: 0     
    });
    find.populate({
        path:'campo',
        populate: {
            path:'complejo',
            populate:{
                path:'propietario',
                model:'User'
            },
            model:'ComplejoDeportivo',
        },
        model:'Campo',
    });
    find.populate({
        path:'creador',
        model:'User'
    });
    find.populate({
        path:'jugadores',
        model:'User'
    }).sort({fechaInicio:1}).exec(function(err,partidos){
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            res.status(200).send({partidos:partidos});
        }
    });
}

function updatePartido(req,res){
    var partidoId = req.params.id;
    var update = req.body;
    console.log(partidoId);
    console.log(update);

    Partido.findByIdAndUpdate(partidoId, update, (err,partidoUpdated) => {
        if(err){
            res.status(500).send({message:'Error al actualizar el partido'});
        }else{
            res.status(200).send ({partido:partidoUpdated});
        }
    });
}


module.exports = {
    savePartido,
    getPartidosByFecha,
    updatePartido,
    getPartidoByJugadorParticipante,
    getPartidoByJugadorCreador
}

