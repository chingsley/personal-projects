const express = require('express');
const router = express.Router();
const messanger = require('./messangerFunctions/orderMessanger');

let orders = messanger.getOrders();
// let fs = require('fs');
// let ordersJsonData = fs.readFileSync('orders.json');
// let ordersJsonObject = JSON.parse(ordersJsonData);
// // console.log(ordersJsonObject);
// let orders = ordersJsonObject.orders;

//Handle GET request for /orders
router.get('/', (req, res, next) => {
    // res.status(200).json(ordersJsonObject); //Will GET an object containing an array of object
    res.status(200).json(orders); // Will GET an array of objects
});

//Handle POST request to add an order
router.post('/', (req, res, next) => {
  let id = messanger.getNewID()
  let order = {
    orderID : id,
    foodName: req.body.foodName,
    itemID : req.body.itemID,
    quantity: req.body.quantity,
    price: Number(req.body.quantity) * Number(req.body.unitPrice),
    userID : req.body.userID,
    username : req.body.username,
    date: req.body.date || null,
    status: "pending",
  }

  if(messanger.addOrder(order)) {
    res.status(201).json({
      message: 'New order has been placed',
      order: messanger.getOrder(id),
      orders: messanger.getOrders(id)
    });
  } else {
    res.status(404).json({
      message: 'Failed to place a new order'
    });
  }
});

//Handle GET request for a particular orders specified by ID
router.get('/:orderID', (req, res, next) => {
    const id = req.params.orderID;
    orders.forEach(order => {
        if(order.orderID === id) {
            res.status(200).json(order);
        }
    });
});

//Handle PUT request updating an order, like setting the status of an order: "pending", "complete", or "declined"
router.put('/:orderID', (req, res, next) => {
  res.status(200).json({
    message: 'Handling PUT request to edit and update a particular order',
    id: req.params.orderID
  });
});

//Handle DELETE request to delete an order
router.delete('/:orderID', (req, res, next) => {
  res.status(200).json({
    message: 'Handling DELETE request to delete a particular order',
    id: req.params.orderID
  });
});


module.exports = router;
