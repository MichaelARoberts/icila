var mongoose  = require('mongoose')
var Schema    = mongoose.Schema;
var bcrpyt    = require('bcrypt-nodejs')

var userSchema = new Schema({
  username  : { type: String, required: true, unique: true},
  password  : { type: String, required: true},
  email     : { type: String, required: true, unqiue: true},
  image     : String,
  fname     : String,
  lname     : String,
  bday      : String,
  joined    : {type: Date, default:Date.now},
  tags      : Array,
  admin     : Boolean,
  verified  : Boolean,
  friends   : Array,
  bio       : String,
  nation    : String
})

userSchema.pre('save',function(next){
  var user = this;

  bcrpyt.hash(user.password, null, null, function(err, hash){
    if (err) {
      return next(err)
    }

    user.password = hash
    next()
  })

})

var User = mongoose.model('User', userSchema)

var newUser = User({
  username: "Michael",
  password: "password",
  email: "michael@roberts.technology"
  admin: true
})

newUser.save(function(err){
  if (err) {
    throw err
  }

  console.log('[!] User Created')
});



module.exports = User
