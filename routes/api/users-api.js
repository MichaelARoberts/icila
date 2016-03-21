// Database Access
var User = require('../../models/user_model')

// Express Access
var express = require('express')
var router = express.Router()

router.route('/users')

  .post(function(req, res) {
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email
    var url = username.replace(/\s/g, '')

    var user = new User ({
      username : username,
      password : password,
      email    : email,
      url      : url
    })

    user.save(user, function(err){
      if (err){
        if (err.name === 'MongoError' && err.code === 11000){
          return res.status(500).send({ succes: false, message: 'User already exist!' });
        } else {
          res.status(500).send({success: false})
        }
      }

      res.json({ message: "User Created!"})
    })

  })

  .get(function(req, res, next) {
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

  .put (function(req, res) {
    username = req.params.username
    filter = {username : username}
    newdata = req.body

    User.findOne(filter, function(err, user){

      // For each key in user and our new data
      for(var ko in user){
        for(var kt in newdata){

          // If one of our keys matches, update
          if (ko == kt){
            console.log(ko)
            console.log(typeof ko)

            // If we're dealing with an array split the pieces
            if (ko == "friends" || ko == "tags") {
              var arrayData = newdata[kt].split(",")
              user[ko] = arrayData
            } else {
              user[ko] = newdata[kt]
            }

          }

        }
      }

      user.save(function (err) {
        if(err) {
          res.send(err)
        }
      })
    })

    res.json({success: true, message: "User Updated!"})

  })

module.exports = router;
