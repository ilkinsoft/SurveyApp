
var express = require('express');
var router = express.Router();
var resultData = require('../model/resultData');
var nodemailer = require('nodemailer');
var fs = require('fs');
var util = require('util');

var ObjectID = require('mongodb').ObjectID;
const cred= require('./Creditionals');
const Question = require('../model/SurveyData').Question;
const Choice = require('../model/SurveyData').Choice;





router.get('/serveyId/:id', async function (req, res, next) {
    var data = await req.DB.collection("surveys").findOne({ '_id': ObjectID(req.params.id) });
    var newData = {};
    // var json = JSON.parse(data);
    newData.title = data.title;
    newData.createdBy = data.createdBy;
    newData.createdAt = data.createdAt;
    newData.questions = data.questions;

    for (let x = 0; x < data.questions.length; x++) {
        if (data.questions[x].choices.length > 0) {
            newData.questions[x].answerStatistic = [];
            for (let i = 0; i < data.questions[x].choices.length; i++) {
                console.log(i)
                newData.questions[x].answerStatistic[i] = 0
            }
            for (let i = 0; i < data.questions[x].answers.length; i++) {
                newData.questions[x].answerStatistic[data.questions[x].answers[i].answer] += 1
                console.log(data.questions[x].answers[i].answer + " is " + newData.questions[x].answerStatistic[data.questions[x].answers[i].answer])
            }
        } else {
            newData.questions[x].articleAnswer = [];
            for (let i = 0; i < data.questions[x].answers.length; i++) {
                var currentanswer = data.questions[x].answers[i];
                var index = newData.questions[x].articleAnswer.map(function (e) { return e.answer; }).indexOf(currentanswer.answer)
                if (index > -1) {
                    newData.questions[x].articleAnswer[index].count += 1;
                }
                else {
                    let obj = {};
                    obj.answer = data.questions[x].answers[i].answer;
                    obj.count = 1;
                    newData.questions[x].articleAnswer.push(obj)


                }
            }
        }

    }
    console.log(newData)
    res.json(newData);
});


router.get('/:username', async function (req, res, next) {
    console.log("User: "+req.params.username)
    var data = await req.DB.collection("surveys").find({ "createdBy": req.params.username }).toArray();
    res.json(data);
});

/* GET users listing. */
router.get('/', async function (req, res, next) {
    var data = await req.DB.collection("surveys").find({ "createdBy": req.user.username }).toArray();
    res.json(data);
});

router.post('/add', async function (req, res, next) {

    console.log(req.body)

    if (!req.body) {
        // 400 Bad Request
        // res.status(400).send('This is a bad request, make sure all fields are correct.')
        resultData.code = resultEnum.insertError
        resultData.data = 'This is a bad request, make sure all fields are correct.'
        res.json(resultData)
        return;
    }

    // res.send(survey);

    await req.DB.collection('surveys').insertOne(req.body, function (err, result) {
        if (err)
            console.log("Error: " + err);

        console.log('added survey')
        resultData.makeSuccess();
        res.json(resultData);
    })
});

router.get('/viewDetails/:surveyId', async function(req, res, next) {
    let id = new ObjectID(req.params.surveyId);
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
            user: cred.userEmail,
            pass: cred.emailPass
        }
    });
  
      const readFile = util.promisify(fs.readFile);
      let emailHTMLFile = await readFile('email.html'); 
      let emailHTMLFileStr = emailHTMLFile.toString().
          replace("{{httpLink}}", "http://localhost:4200/viewSurvey/"+req.body.surveyId+"/"+req.body.email)
      var mailOptions = {
        from: cred.userEmail,
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
    let surveyId = new ObjectID(survey.surveyId);
    let email = req.body.email;
    let answsersMain = Object.keys(survey.answers).map(function(key) {
        return survey.answers[key];
      });
      
    for (var i = 0; i < answsersMain.length; i++) {
        var ind = "questions." +i+ ".answers";
        await req.DB.collection("surveys").updateOne({ _id: surveyId}, {
            $push: {[ind]:{"answer":answsersMain[i],"email":email}}
        })
    }
    res.json({ 'status': 'success' });
  });


module.exports = router;

