'use strict'

var express = require('express');
var noticiasController = require('../controllers/noticias');
var md_auth = require('../middlewares/authenticated')


var api = express.Router();




api.get('/getNoticias',noticiasController.getNoticias);



module.exports = api;