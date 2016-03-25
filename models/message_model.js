var mongoose = require('mongoose')
var Schema = mongoose.Schema

var messageSchema = new Schema({
  users: Array,
  sender: String,
  send_date: {
    type: Date,
    default: Date.now
  }
  content: String
})

var Message = mongose.model('Message', chatSchema)

module.exports = Message
