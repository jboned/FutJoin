'use strict'

var bcrypt = require('bcrypt-nodejs');
var user = require('../models/user');

function saveUser(req, res){
    var user = new user();
    var params = req.body;

    user.name = params.name;
}

module.exports = {
    saveUser
};