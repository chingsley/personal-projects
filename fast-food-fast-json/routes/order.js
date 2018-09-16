var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.render('order', {
    title: "Place your orders"
  });
});

module.exports = router;
