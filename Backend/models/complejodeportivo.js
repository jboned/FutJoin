'use strict'
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var ComplejoDeportivo = schema({
    direccion: String,
    propietario: {type: Schema.ObjectId, ref:'User'}
    //user: email, password, nombre, telefono, codigoPostal,image
})

module.exports = mongoose.model('ComplejoDeportivo',ComplejoDeportivoSchema);