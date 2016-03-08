var mongoose = require('mongoose')
var Schema   = mongoose.Schema;
mongoose.connect('mongodb://localhost/test')

var userSchema = new Schema({
  username : { type: String, required: true, unique: true},
  password : { type: String, required: true},
  email    : String,
  image    : String,
  verified : Boolean,
  birthday : Date,
  bio      : String,
  nation   : String,
  tags     : Array,
  joined   : {type: Date, default:Date.now},
  admin    : Boolean
})

// TODO: Add a bcrypt pre-save method

var User = mongoose.model('User', userSchema)
var newUser = new User({
  username: "Michael",
  password:"password",
  admin: true
})

newUser.save(function(err, newUser){
  if (err) {
    return console.error(err)
  }

  return console.log(newUser.username)
})

module.exports = User
