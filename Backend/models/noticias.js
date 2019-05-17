'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoticiaSchema = Schema({
    mensaje: String,
    fecha: Date
})

module.exports = mongoose.model('Noticia',NoticiaSchema);