var express = require('express');
var router = express.Router();

/* GET menu page. */
router.get('/', (req, res, next) => {
  //render the menu.ejs with the title 'Our Menu'
  res.render('menu', {title: 'Our Menu'});
});

module.exports = router;
