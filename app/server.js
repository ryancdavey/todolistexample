let express = require("express");  
let path = require("path");  
let mongo = require("mongoose");   
let bodyParser = require('body-parser');   
let morgan = require("morgan");  
let db = require("./config.js");  
  
let app = express();  
let port = process.env.port || 7777;  
let srcpath = path.join(__dirname,'/public') ;  
app.use(express.static('public'));  
app.use(bodyParser.json({limit:'5mb'}));    
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));  
  
  
let mongoose = require('mongoose');  
let Schema = mongoose.Schema;  
let studentSchema = new Schema({      
    name: { type: String   },       
    address: { type: String   },     
    email: { type: String },       
    contact: { type: String },       
},{ versionKey: false });  
   
  
var model = mongoose.model('student', studentSchema, 'student');  
  
//api for get data from database  
app.get("/api/getdata",function(req,res){   
 model.find({},function(err,data){  
            if(err){  
                res.send(err);  
            }  
            else{             
                res.send(data);  
                }  
        });  
})  
  
  
//api for Delete data from database  
app.post("/api/Removedata",function(req,res){   
 model.remove({ _id: req.body.id }, function(err) {  
            if(err){  
                res.send(err);  
            }  
            else{    
                   res.send({data:"Record has been Deleted..!!"});             
               }  
        });  
})  
  
  
//api for Update data from database  
app.put("/api/Updatedata",function(req,res){   
 model.findByIdAndUpdate(req.body.id, { name:  req.body.name, address: req.body.address, contact: req.body.contact,email:req.body.email },   
function(err) {  
 if (err) {  
 res.send(err);  
 return;  
 }  
 res.send({data:"Record has been Updated..!!"});  
 });  
})    
  
  
//api for Insert data from database  
app.post("/api/savedata",function(req,res){   
       
    var mod = new model(req.body);  
        mod.save(function(err,data){  
            if(err){  
                res.send(err);                
            }  
            else{        
                 res.send({data:"Record has been Inserted..!!"});  
            }  
        });  
})  
      
// call by default index.html page  
app.get("*",function(req,res){   
    res.sendFile(srcpath +'/index.html');  
})  
  
//server stat on given port  
app.listen(port,function(){   
    console.log("server start on port"+ port);  
})  