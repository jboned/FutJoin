var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PartidoSchema = Schema({
    tipo: String,
    startDate: Date,
    endDate: Date,
    maxJugadores: Number,
    creador: {type: Schema.ObjectId, ref:'User'},
    jugadores: [{type: Schema.Types.ObjectId, ref: 'User'}],
    campo: {type: Schema.ObjectId, ref:'Campo'}
})