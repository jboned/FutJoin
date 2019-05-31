var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PartidoSchema = Schema({
    tipo: Number, //1-> publico, 2->privado
    dia: Date,
    fechaComienzo: Date,
    fechaFin: Date,
    maxJugadores: Number,
    creador: {type: Schema.ObjectId, ref:'User'},
    jugadores: [{type: Schema.Types.ObjectId, ref: 'User'}],
    campo: {type: Schema.ObjectId, ref:'Campo'}
})