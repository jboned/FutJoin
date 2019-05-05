'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/futJoin',{ useNewUrlParser: true },function(err, res){
    if(err){
        throw err;
    }else{
        console.log("BD correcta.");
        app.listen(port,function(){
            console.log("Servidor online en http://localhost:"+port);
        });
    }
});

