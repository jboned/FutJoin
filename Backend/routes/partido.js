'use strict'

var express = require('express');
var partidoController = require('../controllers/partido');
var md_auth = require('../middlewares/authenticated')


var api = express.Router();

api.post('/partidos/savePartido',md_auth.ensureAuth,partidoController.savePartido);
api.post('/partidos/getPartidosByFecha',md_auth.ensureAuth,partidoController.getPartidosByFecha);
api.put('/partidos/updatePartido/:id',md_auth.ensureAuth, partidoController.updatePartido);
api.post('/partidos/getPartidosByJugadorParticipante',md_auth.ensureAuth,partidoController.getPartidoByJugadorParticipante);
api.post('/partidos/getPartidosByJugadorCreador',md_auth.ensureAuth,partidoController.getPartidoByJugadorCreador);


module.exports = api;