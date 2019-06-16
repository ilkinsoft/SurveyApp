
var express = require('express');
var router = express.Router();

router.get('/:username', async function (req, res, next) {
    let doc = await req.DB.collection("surveys").find({"createdBy": req.params.username}).toArray();
    // console.dir(doc)
    res.json(doc)});

module.exports = router;

