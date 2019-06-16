var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


/* GET home page. */
router.get('/inviteToSurvey/:email', function(req, res, next) {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    
      
      var mailOptions = {
        from: process.env.EMAIL_USER,
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
  res.json({ 'status': 'success' });
});

module.exports = router;
