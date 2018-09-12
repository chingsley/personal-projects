var express = require('express');
var router = express.Router();

/* GET users listing. */
// runs with: http://localhost:3000/users/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//runs with : http://localhost:3000/users/cool/
router.get('/cool/', function(req, res, next) { //will also work with '/cool'
  res.send('You are so cool');
});

module.exports = router;
