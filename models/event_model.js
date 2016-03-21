var mongoose = require('mongoose')
var Schema   = mongoose.Schema;

var eventSchema = new Schema({
  name        : {type: String, unqiue: true, required: true},
  created_by  : String,
  desc        : String,
  content     : String,
  event_date  : Date,
  created_date: {type: Date, default: Date.now},
  location    : String,
  zip         : Number,
  tags        : String,
  imgs        : Array,
  url         : String
})

var Event  = mongoose.model("Event", eventSchema)

module.exports = Event
