'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;

mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost:27017/FutJoin', (err, res) => {
    if(err){
        throw err;
    }else{
        console.log("BD correcta.");
        
        app.listen(port,function(){
            console.log("Servidor online en http://localhost:"+port);
        });
    }
});

