var express = require('express');
var ObjectID = require('mongodb').ObjectID;

var router = express.Router();



/* GET users listing. */
router.get('/', async function (req, res, next) {
  var data = await req.DB.collection("surveys").find({}).toArray();
  res.json(data);
});


router.get('/:username', async function (req, res, next) {
  console.log("Andy")
  var data = await req.DB.collection("surveys").find({ "createdBy": req.params.username }).toArray();
  res.json(data);
});




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

module.exports = router;
