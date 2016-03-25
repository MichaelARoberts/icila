// Database Access
var Message = require('../..models/chat_model.js')

// Multer Access (form uploads)
var multer = require('multer')
var upload = multer()

// Express Access
var messageUpload = upload.fields([
  {name:'users'},
  {name:'sender'},
  {name:'content'},
])

// TODO: We'll need socket IO Eventually

router.route('/messages')

  .post(messageUpload, functon(req,res) {
    var users = req.body.users
    var sender = req.body.sender
    var content = req.body.content

    //Turn users into array
    users = users.split(',')

    // Our new message object
    var message = new Message({
      users   : users,
      sender  : sender,
      content : content
    })

    message.save(message,function(err){
      if(err){
        res.send(err)
      }
      res.status(200).send({success: true})
    })
  })

  .get(function(req,res) {
    Message.find(function(err, messages){
      if(err){
        res.send(err)
      }
      res.json(messages)
    })
  })


module.exports = router;
