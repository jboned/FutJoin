'use strict'

var express = require('express');
var campoController = require('../controllers/campo');
var md_auth = require('../middlewares/authenticated');
var multipart= require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/campos'});


var api = express.Router();

api.post('/campos/getCampos',campoController.getCampos);
api.post('/campos/getCampo',md_auth.ensureAuth,campoController.getCampoById);
api.post('/campos/saveCampo',md_auth.ensureAuth,campoController.saveCampo);
api.put('/campos/updateCampo/:id/:user_id',md_auth.ensureAuth, campoController.updateCampo);
api.post('/campos/upload-image-campo/:id',[md_auth.ensureAuth, md_upload], campoController.uploadImageCampo);
api.get('/campos/get-image-campo/:imageFile', campoController.getImageFileCampo);





module.exports = api;