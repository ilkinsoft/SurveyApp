var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


/* GET home page. */
router.get('/inviteToSurvey', function(req, res, next) {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'hisham.mounir.se@gmail.com',
            pass: 'H1sh@mP@ssw0rd2018'
        }
    });

    
      
      var mailOptions = {
        from: 'hisham.mounir.se@gmail.com',
        to: 'hisham.mounir@hotmail.com',
        subject: 'Please this survey',
        text: 'Please this survey'
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
