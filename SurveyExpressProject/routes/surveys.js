
var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://admin:surveysystem1234@cluster0-4k3cn.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true })
let db
let collection

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


router.get('/:username', async function (req, res, next) {
    let doc = await req.DB.collection("surveys").find({"createdBy": req.params.username}).toArray();
    // console.dir(doc)
    res.json(doc)});

router.post('/add', async function (req, res, next) {

    if (!req.body) {
        // 400 Bad Request
        res.status(400).send('This is a bad request, make sure all fields are correct.')
        return;
    }

    // res.send(survey);

    await collection.insertOne(req.body, function (err, result) {
        if (err)
            console.log("Error: " + err);

        console.log('added survey')
        res.json(result);
    })
});


module.exports = router;

