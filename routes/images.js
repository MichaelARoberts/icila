var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/images', function(req, res, next) {
  res.render('./image/imageSearch', { title: 'Images' })
})

router.get('/images/:image', function(req, res, next) {
  image_name = req.params.image
  res.render('./image/imagePage', { title: 'Images | ' + image_name })
})


router.get('/upload-image', function(req,res, next){
  res.render('./image/imageUpload')
})


module.exports = router;
