
var express = require('express');
var router = express.Router();
var resultData = require('../model/resultData');
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://admin:surveysystem1234@cluster0-4k3cn.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true })
let db
let collection
var ObjectID = require('mongodb').ObjectID;


router.use((req, res, next) => {
    if (!db) {
        client.connect(function (err) {
            db = client.db('mwa')
            req.db = db
            collection = db.collection('surveys')
            next()
        })
    }
    else {
        req.db = db
        collection = db.collection('surveys')
        next()
    }
})


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
    console.log("Andy")
    var data = await req.DB.collection("surveys").find({ "createdBy": req.params.username }).toArray();
    res.json(data);
});

/* GET users listing. */
router.get('/', async function (req, res, next) {
    var data = await req.DB.collection("surveys").find({}).toArray();
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

    await collection.insertOne(req.body, function (err, result) {
        if (err)
            console.log("Error: " + err);

        console.log('added survey')
        resultData.makeSuccess();
        res.json(resultData);
    })
});


module.exports = router;

