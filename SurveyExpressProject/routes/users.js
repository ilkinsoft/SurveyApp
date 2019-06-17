var express = require('express');
var jwt = require('../jwtHelper/JwtTokenHelper');
var resultData = require('../model/resultData');
var resultEnum = require('../model/resultEnum');
var bcrypt = require('bcryptjs');

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

   bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, async function(err, hash) {
      //console.log(hash);
      // Store hash in your password DB.
      user.password = hash;

      let result = await req.DB.collection('users').insertOne(user);
      console.log(result)
      resultData.makeSuccess();

      res.json(resultData);

    });
  });



  //res.json(jwt.generate(user));

});


router.post('/login',async function(req,res,next) {
  let user = await req.DB.collection('users').findOne({username:req.body.username});

  if(user){

    // Load hash from your password DB.
    bcrypt.compare(req.body.password, user.password, function(err, ress) {
      //console.log(ress);
      if(ress===true){
        delete user.password;
        resultData.makeSuccessWithData({token:jwt.generate(user),user:user});
        res.json(resultData);
      }else {
        resultData.code=resultEnum.authError;
        resultData.data="Username or password incorrect!";
        res.json(resultData);

      }
    });



  }else{
    resultData.code=resultEnum.authError;
    resultData.data="Username or password incorrect!";
    res.json(resultData);

  }


})


module.exports = router;
