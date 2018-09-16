var express = require('express');
var router = express.Router();

/* GET signin page. */
router.get('/', (req, res, next) => {
  res.render('signin', {
    title: "Sign in",
  });
});

module.exports =router;
