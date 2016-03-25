// Database Access
var Event = require('../../models/event_model.js')

//Multer Access (image/form uploads)
var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/imgs')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

var upload = multer({
  dest:'./public/imgs',
  storage:storage
})

// Express Access
var express = require('express')
var router = express.Router()

// Upload Fields
var eventUpload = upload.fields([
  {name:'name'},
  {name:'creator'},
  {name:'desc'},
  {name:'content'},
  {name:'event_date'},
  {name:'location'},
  {name:'zip'},
  {name:'tags'},
  {name:'imgs', maxCount: 4},
  {name:'url'},
])

router.route('/events')

  .post(eventUpload, function(req,res) {
    var name = req.body.name
    var desc = req.body.desc
    var content = req.body.content
    var location = req.body.location
    var event_date = req.body.event_date
    var creator = req.body.creator
    var zip = req.body.zip
    var tags = req.body.tags
    var url = name.replace(/\s/g, '')

    var filename = req.files.img[0]['filename']
    var img = './imgs/' + filename
    console.log(img)
    //img = req.body.img

    var event = new Event({
      name        : name,
      desc        : desc,
      img         : img,
      content     : content,
      location    : location,
      event_date  : event_date,
      creator     : creator,
      zip         : zip,
      tags        : tags,
      url         : url
    })

    event.save(event, function(err){
      if (err){
        if (err.name === 'MongoError' && err.code === 11000){
          return res.status(500).send({ success: false, message: 'Event already exist!' });
        } else {
          res.status(500).send({success: false})
        }
      }

      res.status(200).send({success: true})
    })


  })

  .get(function(req,res) {
    Event.find(function(err, events) {
      if (err){
        res.send(err)
      }

      res.json(events)
    })
  })

router.route('/events/:url')

  .get(function(req,res){
    url = req.params.url
    filter = {url:url}

    Event.findOne(filter, function(err, event){
      if (err){
        res.send(err)
      }

      res.json(event)
    })
  })

  module.exports = router;
