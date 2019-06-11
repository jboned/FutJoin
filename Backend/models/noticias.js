'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoticiaSchema = Schema({
    mensaje: String,
    fecha: Date,
    tipo: Number //1 -> complejo, 2-> campo (POR AHORA)
})

module.exports = mongoose.model('Noticia',NoticiaSchema);