var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


/* GET home page. */
router.get('/inviteToSurvey', function(req, res, next) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'hisham.mounir.se@gmail.com',
          pass: 'H1sh@mP@ssw0rd2018'
        }
      });
      
      var mailOptions = {
        from: 'hisham.mounir.se@gmail.com',
        to: 'hisham.mounir@hotmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  res.render('index', { title: 'Express' });
});

module.exports = router;
