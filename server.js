//username aidan83diaz
//password games

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://aidan83diaz:games@cluster0.mpdbm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "videogames";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('games').find().sort({upVote: -1}).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {submittedGames: result})
  })
})

app.post('/videoGames', (req, res) => {
  db.collection('games').insertOne({videoGameName: req.body.videoGameName, gameSystem: req.body.gameSystem, completed: false}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/favorite', (req, res) => {
  db.collection('games')
  .findOneAndUpdate({videoGameName: req.body.videoGameName, gameSystem: req.body.gameSystem}, {
    $set: {
      completed: true
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/unfavorite', (req, res) => {
  db.collection('games')
  .findOneAndUpdate({videoGameName: req.body.videoGameName, gameSystem: req.body.gameSystem}, {
    $set: {
      completed: false
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/deleteGame', (req, res) => {
  db.collection('games').findOneAndDelete({videoGameName: req.body.videoGameName, gameSystem: req.body.gameSystem}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
