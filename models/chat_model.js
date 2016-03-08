var mongoose = require('mongoose')
var Schema   = mongoose.Schema;


var chatSchema = new Schema({
  users     : Array,
  messages  : {
    sender    : String,
    message   : String,
    sent_time : {type: Date, default: Date.now}
  }
})

var Chat = mongose.model('Chat', chatSchema)

module.exports = Chat
