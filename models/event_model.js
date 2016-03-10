var mongoose = require('mongoose')
var Schema   = mongoose.Schema;

var eventSchema = new Schema({
  eventname   : {type: String, unqiue: true, required: true},
  created_by  : String,
  desc        : String,
  content     : String,
  event_date  : Date,
  created_date: {type: Date, default: Date.now},
  images      : Array,
  location    : String,
  zip         : Number,
})

var Event  = mongoose.model("Event", eventSchema)

module.exports = Event
