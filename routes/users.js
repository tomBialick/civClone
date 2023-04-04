var express = require('express');
var router = express.Router();

var db = require('../db/db_utility.js')

/* POST a new auth token */
router.post('/auth', function(req, res, next) {
  let password = req.body.password;
  let username = req.body.username;

  db.query('SELECT * FROM USERS WHERE USERNAME = $1', [username]).then(data => {
    if (!data[0]) {
      res.status(404).send("Username does not exist");
    }
    else if (data[0].password === password) {
      req.session.user = data[0].username
      req.session.save();
      res.status(201).json({body: {results: {status: "Authorized", username: data[0].username}}});
    }
    else {
      res.status(422).send("Incorrect Password");
    }
  }).catch(error => {
    console.log('ERROR:', error);
    res.status(500).send("Contact Admin(s)");
  })

});

/* GET current authentication credential */
router.get('/auth', function(req, res, next) {
  if (!req.query.token) {
    res.status(400).send("Invalid Token")
  }
  else if (!req.sessionID) {
    res.status(401).send("Unauthorized Access")
  }
  else {
    db.query('SELECT * FROM USERS WHERE USERNAME = $1', [req.session.user]).then(data => {
      if (!data[0]) {
        res.status(404).send("Username does not exist");
      }
      else if (req.sessionID) {
        res.status(200).json({body: {results: {status: "Authorized", username: data[0].username}}});
      }
      else {
        res.status(422).send("Not Logged In")
      }
    }).catch(error => {
      console.log('ERROR:', error);
      res.status(500).send("Contact Admin(s)");
    })
  }
});

/* Logout */
router.delete('/auth', function(req, res, next) {
  if (!req.session.user || !req.cookies.user_sid) {
    res.status(401).send("Unauthorized Access")
  }
  else {
    delete req.session.user
    delete req.cookies.user_sid
    res.clearCookie('user_sid')
    res.status(201).send("Successfully Logged Out")
  }
})

/* POST a new user */
router.post('/createUser', function(req, res, next) {
  var user_id;

  if (!req.body.username || !req.body.password) {
    res.status(400).send("Missing elements");
  }
  else {
    let username = req.body.username;
    let password = req.body.password;

    db.query('SELECT * FROM USERS WHERE USERNAME = $1', [username]).then(data => {
      if (data[0]) {
        res.status(400).send("Username Already Exists");
      }
      else {
        db.query('SELECT MAX(ID) FROM USERS').then(results => {
          if (!results[0]) {
            user_id = 1;
          }
          else {
            user_id = results[0].max + 1;
          }

          db.query('INSERT INTO USERS (ID, USERNAME, PASSWORD) VALUES ($1, $2, $3)', [user_id, username, password]).then(results => {
            res.status(201).json({body:{result:"User Profile Successfully Created"}})
          }).catch(error => {
            console.log('ERROR:', error);
            res.status(400).send("Bad Request");
          })
        }).catch(error => {
          console.log('ERROR:', error);
          res.status(500).send("Issue Connecting to Database");
        })
      }
    }).catch(error => {
      console.log('ERROR:', error);
      res.status(500).send("Issue Connecting to Database");
    })
  }
});


module.exports = router;
