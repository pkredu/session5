const express = require ("express");
const MongoClient = require("mongodb").MongoClient;
mongoURL = "mongodb://127.0.0.1:27017/";

const bodyParser = require('body-parser');

//connect with DB

MongoClient.connect(mongoURL,{useNewUrlParser:true})
.then(client =>{
    // connect or create DB-instance
    db = client.db('newUserDatabase_Edu');
    console.log('database connected')
})

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
app.post('/user',function(req,res){
    // choose collection
    // add the function
        // transformation - might 
    // send the repsonse
    db.collection(collectionName)
    .insertOne(req.body)
    .then((result)=>{
        res.status(201).send(`inserted User - ${req.body}`);
    })
    .catch(err =>{
        res.send(500);
    })
})
// READ
app.get('/users',function(req,res){
    db.collection(collectionName).find().toArray()
    .then(result=>{
        res.send(result)
    })
    .catch(err=>{
        res.send(err)
    })
})

// update
app.put('/updateUser',function(req,res){
    db.collection(collectionName)
    .findOneAndUpdate({"name":req.body.name},
    {
        $set:{name:req.body.name,
            city:req.body.city,
            //address: key
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
    db.collection(collectionName)
    .findOneAndDelete({"name":req.body.name})
    .then(result=>{
        res.send('User Deleted')
    })
    .catch(err=>{
        res.status(500).send('db query failed')
    })
})