'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var UserSchema = schema({
    email: String,
    password: String,
    nombre: String,
    tipo: Number,

    fecha: Date,
    telefono: String,
    codigoPostal: String,
    image: String,
    
    piebueno: String,
    posicion: String,
    altura: Number,
    partidosJugados:Number

});

module.exports = mongoose.model('User', UserSchema);