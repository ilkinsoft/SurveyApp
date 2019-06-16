var express = require('express');
var jwt = require('../jwtHelper/JwtTokenHelper');
var resultData = require('../model/resultData');
var resultEnum = require('../model/resultEnum');

var router = express.Router();

/* GET users listing. */
router.get('/',async function(req, res, next) {
  let result = await req.DB.collection('users').find({}).toArray();
  res.json(result);
});


router.post('/',async function(req, res, next) {
  // let user = {
  //   "username": "Asaad",
  //   "email": "asaadsaad@mum.edu"
  // };

  let user = req.body;

  let result = await req.DB.collection('users').insertOne(user);

  resultData.makeSuccess();

  res.json(resultData);

  //res.json(jwt.generate(user));

});


router.post('/login',async function(req,res,next) {
  let user = await req.DB.collection('users').findOne({username:req.body.username,password:req.body.password});
  if(user){
    delete user.password;
    resultData.makeSuccessWithData({token:jwt.generate(user),user:user});
  }else{
    resultData.code=resultEnum.authError;
    resultData.data="Username or password incorrect!";
  }

  res.json(resultData);

})


module.exports = router;
