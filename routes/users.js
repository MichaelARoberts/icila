// Database Access
var User = require('../models/user_model')

// Express Access
var express = require('express');
var router = express.Router();



/* GET users listing. */
router.route('/users')

  .post(function(req,res) {
    var user = new User()
    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function(err){
      if (err){
        res.send(err)
      }

      res.json({ message: "Bear Created!"})
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


module.exports = router;
