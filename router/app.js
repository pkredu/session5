const express = require ("express");

const app = express ();
const port = 3000;

var birds = require("./birds");

app.use('/birds',birds);

app.listen(port,function(){
    console.log(`server is srunning at - `,port);
})

app.get('/',function(req,res){
    res.send('website home');
})

