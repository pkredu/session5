const express = require("express");

var router = express.Router();

router.use(function accessTime(req,res,next){
    console.log('Time:',Date.now())
    next();
})

router.get('/',function(req,res,next){
    res.send('Birds Home page');
})

router.get('/about',function(req,res,next){
    res.send('About Birds');
})
module.exports = router;