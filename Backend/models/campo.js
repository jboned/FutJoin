'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CampoSchema = Schema({
    nombre: String,
    tipo: Number,
    largo: Number,
    ancho: Number,
    superficie: String,
    aforoGrada: Number,
    sistemaIluminacion: Boolean,
    complejo: {type: Schema.ObjectId, ref:'ComplejoDeportivo'}
})

module.exports = mongoose.model('Campo',CampoSchema);