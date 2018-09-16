var express = require('express');
var router = express.Router();

/* GET signin page. */
router.get('/', (req, res, next) => {
  res.render('signup', {
    title: "Sign up",
  });
});

module.exports =router;
