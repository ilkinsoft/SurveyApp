var express = require('express');
var jwt = require('../jwtHelper/JwtTokenHelper')
var router = express.Router();

/* GET users listing. */
router.get('/',async function(req, res, next) {
  let result = await req.DB.collection('users').find({}).toArray();
  res.json(result);
});


router.post('/',async function(req, res, next) {
  let user = {
    "username": "Asaad",
    "email": "asaadsaad@mum.edu"
  };

  let result = await req.DB.collection('users').insertOne(user);

  res.json(jwt.generate(user));
});


module.exports = router;
