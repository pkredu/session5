const express = require ("express");
const mongoose = require('mongoose');
mongoURL = "mongodb://127.0.0.1:27017/mongooseUserDB";

const bodyParser = require('body-parser');
var userModel = require('./model/user');
//connect with DB

mongoose.connect(mongoURL);

const app = express ();
const port = 3000;
const collectionName = 'userList';
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.listen(port,function(){
    console.log(`server i srunning at - `,port);
})

app.get('/',function(req,res){
    res.send(`Server is up and running`)
})

// create with MONGODB
app.post('/addUser',function(req,res){
    userModel.create(req.body)
    .then(()=>{
        res.send('added user');
    })
})
// READ
app.get('/users',function(req,res){
    userModel.find()
    .then(result=>{
        res.send(result)
    })
    .catch(err=>{
        res.send(err)
    })
})

// update
app.put('/updateUser',function(req,res){
    userModel
    .findOneAndUpdate({"name":req.body.name},
    {
        $set:{name:req.body.name,
            city:req.body.city,
            age:req.body.age
        }
    },{upsert:true})
    .then(result=>{
        res.send(result);
    })
    .catch(err=>{
        res.send(err);
    })
})

app.delete('/deleteUser',function(req,res){
    userModel
    .findOneAndDelete({"name":req.body.name})
    .then(result=>{
        res.send('User Deleted')
    })
    .catch(err=>{
        res.status(500).send('db query failed')
    })
})