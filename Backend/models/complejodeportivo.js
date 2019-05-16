'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComplejoDeportivoSchema = Schema({
    direccion: String,
    propietario: {type: Schema.ObjectId, ref:'User'}
    //user: email, password, nombre, telefono, codigoPostal,image
})

module.exports = mongoose.model('ComplejoDeportivo',ComplejoDeportivoSchema);