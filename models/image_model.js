var mongoose = require('mongoose')
var Schema = mongoose.Schema

var imageSchema = new Schema({
  img           : String,
  title         : String,
  caption       : String,
  zip           : Number,
  ip            : String,
  created_date  : {type: String, default: Date.now},
  tags          : Array,
  url           : String
})

var Image =  mongoose.model('Image', imageSchema)

module.exports = Image
