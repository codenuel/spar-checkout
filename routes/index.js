var express = require('express');
var router = express.Router();
var request = require('request');
require('dotenv').config();
// require('../models/list')

/* GET home page. */
router.get('/', function(req, res, next) {
//   order.findById(req.params.order_id, function(err, item) {
//     if (err)
//         res.send(err);
//     // res.json(student);
// });
  res.render('index', { title: '' });
});


module.exports = router;
