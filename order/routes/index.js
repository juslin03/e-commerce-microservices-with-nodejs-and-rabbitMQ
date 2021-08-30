const routes = require('express').Router();
const isAuthenticated = require('../../isAuthenticated');
const OrderController = require('../controllers/OrderController');

routes
    .post('/product/create', isAuthenticated, OrderController.create)
    .post('/product/buy', isAuthenticated, OrderController.buy);

module.exports = routes;