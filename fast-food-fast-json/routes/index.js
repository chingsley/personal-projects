var express = require('express');
var router = express.Router();
let callbacks = require('./callbacks');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'The Dietitian' });
});


/******************************************************/
/************** SET UP ROUTE FOR ORDERS ****************/
/******************************************************/

/* Place a new order */
router.post('/orders', (req, res, next) => {
  res.render('index', { title: 'place a new order' });
  // res.send('place a new order');
});

/* Update the status of an order (requires orderID) */
router.put('/orders/:id', (req, res, next) => {
  res.render('index', { title: 'Update the status of an order' });
});

/* GET request to delete an order (requires orderID)*/
router.get('/orders/:id/delete', (req, res, next) => {
  res.render('index', { title: 'Request to delete a particular order'})
});

/* POST request to delete order (requires orderID)*/
router.post('/orders/:id/delete', (req, res, next) => {
  res.render('index', {title: 'performs the actual delete'})
});

/* Fetch a specific order (requires orderID)*/
router.get('/orders/:id', (req, res, next) => {
  let data = req.params;
  res.render('order', {
    title:'order '+data.id,
    order: callbacks.getOrder(data.id),
   });
});

/* Get all the orders*/
router.get('/orders', (req, res, next) => {
  res.render('orders', {
     title: 'Orders',
     orders: callbacks.getOrders(),
     users: callbacks.getUsers()
  });
});





/******************************************************/
/************** SET UP ROUTE FOR USERS ****************/
/******************************************************/
/* Place a new user */
router.post('/users', (req, res, next) => {
  res.render('index', { title: 'place a new user' });
  // res.send('place a new user');
});

// /* Update the status of an user (requires userID) */
// router.put('/users/:id', (req, res, next) => {
//   res.render('index', { title: 'Update the status of an user' });
// });

/* GET request to delete an user (requires userID)*/
router.get('/users/:id/delete', (req, res, next) => {
  res.render('index', { title: 'Request to delete a particular user'})
});

/* POST request to delete user (requires userID)*/
router.post('/users/:id/delete', (req, res, next) => {
  res.render('index', {title: 'performs the actual delete'})
});

/* Fetch a specific user (requires userID)*/
router.get('/users/:id', (req, res, next) => {
  res.render('index', { title: 'Fetch a particular user' });
});

/* Get all the users*/
router.get('/users', (req, res, next) => {
  res.render('users', { title: 'Users', users:callbacks.getUsers() });
  //the returned value of getUsers() method is assigned to users variable
});



module.exports = router;
