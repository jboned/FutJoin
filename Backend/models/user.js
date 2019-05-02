'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = schema({
    email: String,
    password: String,
    alias: String,
    telefono: String,
    direccion: String,
    image: String,
    nombre: String,
    tipo: Number,
    piebueno: String,
    posicion: String,
    altura: Number,
    partidosJugados:Number

});

module.exports = mongoose.model('User', userSchema);