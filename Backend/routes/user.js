'use strict'

var express = require('express');
var userController = require('../controllers/user').default;

var api = express.Router();

api.get('/pruebaControlador',userController.saveUser);

module.exports = api;