'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_futjoin';

exports.createToken = function (user){
    var payload = {
        sub: user._id,
        name: user.nombre,
        email: user.email,
        image:user.image,
        role: user.tipo,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix       
    };
    return jwt.encode(payload,secret);
}