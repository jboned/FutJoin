'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CampoSchema = Schema({
    nombre: String,
    tipo: Number,
    complejo: {type: Schema.ObjectId, ref:'ComplejoDeportivo'}
})

module.exports = mongoose.model('Campo',CampoSchema);