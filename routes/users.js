// Database Access
var User = require('../models/user_model')

// Express Access
var express = require('express');
var router = express.Router();



/* GET users listing. */
router.route('/users')

  .post (function(req,res) {
    username = req.body.username
    password = req.body.password
    email = req.body.email

    var user = new User ({
      username : username,
      password : password,
      email    : email
    })

    user.save(user, function(err){
      if (err){
        if (err.name === 'MongoError' && err.code === 11000){
          return res.status(500).send({ succes: false, message: 'User already exist!' });
        } else {
          res.status(500)
        }
      }

      res.json({ message: "User Created!"})
    })

  })

  .get(function(req, res) {
    User.find(function(err, users) {
      if (err){
        res.send(err)
      }

      res.json(users)
    })
  })

router.route('/users/:username')

  .get (function(req,res) {
    username = req.params.username
    filter = {username : username}

    User.findOne(filter, function(err, user) {
      if (err) {
        res.send(err)
      }

      res.json(user)
    })

  })

module.exports = router;
