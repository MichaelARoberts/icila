var mongoose = require('mongoose')
var Schema   = mongoose.Schema

var chatSchema = new Schema({
  users     : Array,
  sender    : String,
  send_date : {type: Date, default: Date.now}
  content   : String
})

var Chat = mongose.model('Chat', chatSchema)

module.exports = Chat
