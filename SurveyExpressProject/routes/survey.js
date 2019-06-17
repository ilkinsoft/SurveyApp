var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var fs = require('fs');
var util = require('util');
const ObjectId = require('mongodb').ObjectId;

const Question = require('../model/SurveyData').Question;
const Choice = require('../model/SurveyData').Choice;


/* GET users listing. */
router.get('/', async function(req, res, next) {
  var data = await req.DB.collection("surveys").find({}).toArray();
  res.json(data);
});


router.get('/:username', async function(req, res, next) {
  var data = await req.DB.collection("surveys").findOne({"createdBy":req.params.username});
  res.json(data);
});

router.get('/viewDetails/:surveyId', async function(req, res, next) {
  let id = new ObjectId(req.params.surveyId);
  console.log(id);
  let data = await req.DB.collection("surveys").findOne({"_id":id});

  let questions = [];
  for (var i = 0; i < data.questions.length; i++) {
    let question = new Question(
      data.questions[i].choices.length > 0 ? 'radiogroup' : 'text',
      data.questions[i].question,
      ''+i);
    
    let choices = [];
    for (var j = 0; j < data.questions[i].choices.length; j++) {
      choices.push(new Choice(data.questions[i].choices[j],j));
    }
    if(choices.length > 0){
      question.choices = choices;
    }
    questions.push(question);
  }

  let survey = {"title":data.title,"pages": [{"elements": questions}]};
  res.json(survey);
});

router.post('/inviteToSurvey', async function(req, res) {
  console.log('inside inviteToSurvey');
  console.log(req.body);

  let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
          user: 'mwamum362@gmail.com',
          pass: 'P@ssw0rd2019'
      }
  });

    const readFile = util.promisify(fs.readFile);
    let emailHTMLFile = await readFile('email.html'); 
    let emailHTMLFileStr = emailHTMLFile.toString().
        replace("{{httpLink}}", "http://localhost:4200/viewSurvey/"+req.body.surveyId)
    var mailOptions = {
      from: 'mwamum362@gmail.com',
      to: req.body.email,
      subject: 'Please this survey',
      html: emailHTMLFileStr
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.error({ 'status': 'wrong' });
      } else {
        console.log('Email sent: ' + info.response);
        res.json({ 'status': 'success' });
      }
    });
});

router.post('/completeSurvey', async function(req, res) {
  let survey = req.body;

  // let surveyId = new ObjectId(survey.surveyId);
  // await req.DB.collection("surveys").update({'_id':surveyId},{
  //   [{ $push: {'questions': } }]]
  // })
});

module.exports = router;
