var Event = require('../../models/event_model.js')

var express = require('express')
var router = express.Router()

router.route('/events')

  .post(function(req,res) {
    var name = req.body.name
    var created_by = req.body.created_by
    var desc = req.body.name
    var content = req.body.content
    var event_date =  req.body.event_date
    var location = req.body.location
    var zip = req.body.zip
    var tags = req.body.tags
    tags = tags.split(",")
    var url = name.replace(/\s/g, '')

    var event = new Event({
      name        : name,
      created_by  : created_by,
      desc        : desc,
      content     : content,
      event_date  : event_date,
      location    : location,
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

      res.json({ message: "Event Created!"})
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
