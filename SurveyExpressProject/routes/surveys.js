
var express = require('express');
var router = express.Router();

router.get('/solo', async function (req, res, next) {
    console.log("Here")
    let doc = await req.DB.collection("surveys").find({'title':'Survey1'}).toArray();
    // console.dir(doc)
    res.json(doc)
    // let doc = await req.body.aggregate({"createdBy": req.params.username} , {"group" : { "_id" : "$createdBy" }})
});


router.get('/:username', async function (req, res, next) {
    console.log("Andy")
    let doc = await req.DB.collection("surveys").find({"createdBy": req.params.username}).toArray();
    // console.dir(doc)
    res.json(doc)
    // let doc = await req.body.aggregate({"createdBy": req.params.username} , {"group" : { "_id" : "$createdBy" }})
});



module.exports = router;

