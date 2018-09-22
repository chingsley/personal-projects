const express = require('express');
const bodyParser = require('body-parser');

const app = express();


const itemRoutes = require('./api/routes/items');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

app.use(bodyParser.json());

app.use('/items', itemRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

module.exports = app;
