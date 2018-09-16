var express = require('express');
var router = express.Router();

/*GET manageOrders page */
router.get('/', (req, res, next) => {
  res.render('manageOrders', {
    title: "Manage Orders",
  });
});

module.exports = router;
