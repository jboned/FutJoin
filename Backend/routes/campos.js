'use strict'

var express = require('express');
var campoController = require('../controllers/campo');
var md_auth = require('../middlewares/authenticated');
var multipart= require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/camposs'});


var api = express.Router();

api.post('/getCampos',campoController.getCampos);
api.post('/saveCampo',campoController.saveCampo);
api.post('/upload-image-campo/:id',[md_auth.ensureAuth, md_upload], campoController.uploadImageCampo);
api.get('/get-image-campo/:imageFile', campoController.getImageFileCampo);





module.exports = api;