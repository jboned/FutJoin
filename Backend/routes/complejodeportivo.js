'use strict'

var express = require('express');
var complejoDeportivoController = require('../controllers/complejodeportivo');
var md_auth = require('../middlewares/authenticated')


var api = express.Router();



api.post('/saveComplejo',complejoDeportivoController.saveComplejoDeportivo);

api.post('/getComplejos',complejoDeportivoController.getComplejosDeportivo);



module.exports = api;