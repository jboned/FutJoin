var mongoose = require('mongoose');
var schema = mongoose.Schema;

var ComplejoDeportivo = schema({
    nombre: String,
    direccion: String,
    propietario: User;

});