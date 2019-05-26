'use strict'

var express = require('express');
var complejoDeportivoController = require('../controllers/complejodeportivo');
var md_auth = require('../middlewares/authenticated')


var api = express.Router();



api.post('/complejos/saveComplejo',complejoDeportivoController.saveComplejoDeportivo);

api.post('/complejos/getComplejos',complejoDeportivoController.getComplejosDeportivo);

api.post('/complejos/getComplejo',complejoDeportivoController.getOneComplejoDeportivo);



module.exports = api;