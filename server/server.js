const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;

//Setting Up Database
mongoose.connect('mongodb://localhost:27017/school-nodemap');
var mongoo = {};
mongoo.School = mongoose.model('schools',{
    name: {
        type: String
    },
    nodemap:{
        type: Object
    },
    active:{
        type: Boolean
    }
});
mongoo.UserData = mongoose.model('user-data',{

});
mongoo.Bug = mongoose.model('bugs',{
    description:{
        type: String
    },
    metadata:{
        type: Object
    }
});

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
app.use(express.static(path.join(__dirname,'..','/client')));
app.get('/*',function(req,res){
    res.redirect('/');
});

//Starts server
app.listen(port,function(){
    console.log('Listening on port:',port);
});
module.exports.app = app;
