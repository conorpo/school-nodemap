const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const port = process.env.PORT || 3002;
const mongoC =  process.env.MONGO_URI;

//Setting Up Database
mongoose.connect(mongoC);
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
    },
    imagePath:{
        type: String
    },
    count:{
        type: Number
    }
});
// mongoo.UserData = mongoose.model('use-log',{

// });
// mongoo.Bug = mongoose.model('bugs',{
//     description:{
//         type: String
//     },
//     metadata:{
//         type: Object
//     }
// });
var app = express();
app.use(function(req,res,next){
    // console.log(req.query);
    var now = new Date().toString();
    var log = now +' '+ req.method +' '+ req.url;
    // console.log(log);
    fs.appendFile('server.log',log+'\n',function(err){
        if(err){
            console.log('Unable to append');
        }
    })
    next();
});
app.use(express.static(path.join(__dirname,'..','/client')));
app.get('/schools',function(req,res){
    console.log('Called schools');
    if(req.query.school != undefined){
        mongoo.School.findOne({name:req.query.school},'nodemap imagePath count',function(err,doc){
            if(err){
                res.status(404).send('Couldnt get the school you requested');
            }else{
                mongoo.School.update({name:req.query.school},{ $set: {count: doc.count+1}},function(err,doc){
                    if(err){
                        console.log('Couldnt Update')
                    }
                });
                res.send(doc);

            }
        })
    }else{
        mongoo.School.find({active:true},'name',function(err,schools){
            if(err){
                res.status(404).send("Couldn't get the schools");
            }else{
                res.send(schools);
            }
        });
    }
});
app.get('/use',function(req,res){

});
app.get('/*',function(req,res){
    res.redirect('/');
});
//Starts server
app.listen(port,function(){
    console.log('Listening on port:',port);
});
module.exports.app = app;
