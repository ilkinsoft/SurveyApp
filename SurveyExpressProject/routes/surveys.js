
var express = require('express');
var router = express.Router();

router.get('/:username', async function (req, res, next) {
    // let doc = await req.DB.collection("surveys").find({"createdBy": req.params.username}).toArray();
    // // console.dir(doc)
    // res.json(doc)
    let doc = await req.body.aggregate({"createdBy": req.params.username} , {"group" : { "_id" : "$createdBy" , "count": {"$sum":1}}})
});

module.exports = router;

