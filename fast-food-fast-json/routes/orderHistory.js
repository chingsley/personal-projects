var express = require('express');
var router = express.Router();

/* GET orderHistory page.*/
router.get('/', (req, res, next) =>{
  res.render('orderHistory', {
    title: "Order History",
  });
});

module.exports = router;
