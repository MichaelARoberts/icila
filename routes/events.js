var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/events', function(req, res, next) {
  res.render('./event/eventSearch', { title: 'Events' });
});

router.get('/events/:event', function(req,res,next) {
  var event_name = req.params.event
  res.render('./event/eventPage', { title: 'Events | ' + event_name })
})

router.get('/create-event', function(req,res,next) {
  res.render('./event/eventCreate', { title: 'Create Event' })
})

module.exports = router;
