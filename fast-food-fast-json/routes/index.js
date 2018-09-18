var express = require('express');
var router = express.Router();
let callbacks = require('./callbacks');


/******************************************************/
/************** SET UP ROUTE FOR THE HOME PAGE ********/
/******************************************************/
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'The Dietitian' });
});


/******************************************************/
/************** SET UP ROUTE FOR SIGNING IN ***********/
/******************************************************/
/*GET request to display the sign in page */
router.get('/signin', (req, res, next) => {
  res.render('signin', {error: ""});
});

//A boolean to check if a user is registered. Initialized to false
// let isRegisteredUser = false;


/*POST request handle the sign operation */
router.post('/signin', (req, res, next) => {
  if( callbacks.isRegisteredUser(req.body.userName, req.body.password) ){
    res.render('index', {title: 'welcome '+ req.body.userName});
  }else {
    res.render('signin', {error: "Incorrect password / username", password: ""});
  }
});





/*****************************************************************/
/************** SET UP ROUTE FOR SIGNING UP (REGISTER) ***********/
/*****************************************************************/
/*GET request to display the sign in page */
router.get('/signup', (req, res, next) => {
  res.render('signup', {registered: false, error: "", msg:""});
});

router.post('/signup', (req, res, next) => {
  // let newUserID = callbacks.getNewID('user');
  let username = req.body.userName;
  let password = req.body.password;
  let telephone = req.body.telephone;
  let email = req.body.email;

  if( callbacks.isTaken(req.body.userName) ) {

    res.render('signup', {registered:false, error: "username is taken, choose another username", msg:""});
    // return; //This return did NOT cause any issues. But the program still works without it

  }else {

    let outcome = callbacks.registerUser(username, password, telephone, email);
    if(outcome === false) {
      res.render('signup', {registered:false, error:"there was a problem with your registration, please try again", msg:""});
    }else{
      res.render('signup', {registered: true, error:"", msg: "Successfully Registered!. You can now sign in"});
    }

  }

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
