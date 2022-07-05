var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
const mongodb = require('mongodb')
let db;

let connectionString = `mongodb://localhost:27017/tesla`

mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db()
    db.collection
  }
)

router.get('/', function (req, res, next) {
  db.collection('User')
  .find()
    .toArray(function (err, users) {
      res.format({
        html: function () {
          res.render('users/index', {
            title: 'Todos los usuarios',
            "users": users
          });
        },
        json: function () {
          res.json(users);
        }
      })
  })
});

router.get('/one/:id', function (req, res) {
  db.collection('User').findOne( {"_id": ObjectId(req.params.id)
  }, function (err, user) {
    console.log(user)
    res.send(user);
});
});

router.get('/new', function(req, res) {
  res.render('users/new', { title: 'Agregar usuario' });
});


router.post("/", function (req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var name = req.body.name;
  var bornDate = req.body.bornDate;
  var country = req.body.country;
  var language = req.body.language;
  //call the create function for our database
  db.collection('User').insertOne({
    username,
    email,
    name,
    bornDate,
    country,
    language
  }, function (
    err,
    info
  ) {
    res.json(info.ops[0])
  })
});
module.exports = router;
