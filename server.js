const express = require('express');
const config  = require('./config')
const fs = require('fs');

var app = express();
app.use(function(req,res,next){
    var now = new Date().toString();
    var log = now +' '+ req.method +' '+ req.url;
    console.log(log);
    fs.appendFile('server.log',log+'\n',function(err){
        if(err){
            console.log('Unable to append');
        }
    })
    next();
});
app.use(express.static(__dirname+'/client'));

//Sets up handlers
app.get('/', function(req,res){
    res.send('<h1>Hello Expresss!</h1>');
});

//Starts server
app.listen(config.httpPort,function(){
    console.log('Listening on port:',config.httpPort);
});
