var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bucketlist Api', url: 'https://documenter.getpostman.com/view/3647474/RWaPsm5F' });
});

module.exports = router;
