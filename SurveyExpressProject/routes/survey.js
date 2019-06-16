var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var data = await req.DB.collection("surveys").find({}).toArray();
  res.json(data);
});


router.get('/:username', async function(req, res, next) {
  var data = await req.DB.collection("surveys").findOne({"createdBy":req.params.username});
  res.json(data);
});

module.exports = router;
