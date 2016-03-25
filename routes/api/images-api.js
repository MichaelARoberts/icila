// Database Access
var Image = require('../../models/image_model')

var crypto = require('crypto')
var mime = require('mime')

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
var imageUpload = upload.fields([
  {name:'img', maxCount: 1},
  {name:'title'},
  {name:'caption'},
  {name:'zip'},
  {name:'tags'}
])

/* GET users listing */
router.route('/images')

  .post(imageUpload, function(req,res) {

    // Image Info
    var filename = req.files.img[0]['filename']
    var img = './imgs/' + filename
    var title = req.body.title
    var caption = req.body.caption
    var zip = req.body.zip
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var tags = req.body.tags
    var url = filename

    // TODO: Get ZIP code via geoip
    // var zip =

    var image = new Image({
      img     : img,
      title   : title,
      caption : caption,
      zip     : zip,
      ip      : ip,
      tags    : tags,
      url     : url
    })

    //Save
    image.save(image, function(err){
      if(err){
        console.log(err)
      }

      res.status(200).send({success: true, message: "Image Saved."})
    })
  })

  .get (function(req,res) {
    Image.find(function(err, users) {
      if(err){
        res.send(err)
      }

      res.json(users)
    })
  })

module.exports = router;
