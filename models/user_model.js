var mongoose  = require('mongoose')
var Schema    = mongoose.Schema;
var bcrpyt    = require('bcrypt-nodejs')

var userSchema = new Schema({
  username  : { type: String, required: true, unique: true, dropDups: true},
  password  : { type: String, required: true},
  email     : { type: String, required: true, unqiue: true, dropDups: true},
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

// TODO: Get this hasher working!
userSchema.pre('save',function(next){
  var user = this;

  bcrpyt.hash(user.password, null, null, function(err, hash){
    if (err) {
      return next(err)
    }

    user.password = hash;
    next()
  })

})

var User = mongoose.model('User', userSchema)

module.exports = User
