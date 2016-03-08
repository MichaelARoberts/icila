var mongoose = require('mongoose')
var Schema   = mongoose.Schema;

var eventSchema = new Schema({
  name      : {type: String, unqiue: true, required: true},
  creator   : String,
  desc      : String,
  images    : Array,
  data      : Date,
  location  : String,
  zip       : Number,
  created   : {type: Date, default: Date.now}
})

var Event  = mongoose.model("Event", eventSchema)

module.exports = Event
