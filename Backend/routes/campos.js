'use strict'

var express = require('express');
var campo = require('../controllers/campo');
var md_auth = require('../middlewares/authenticated')


var api = express.Router();

api.post('/getCampos',campo.getCampos);



module.exports = api;