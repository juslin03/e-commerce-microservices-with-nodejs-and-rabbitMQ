const routes = require('express').Router();
const isAuthenticated = require('../../isAuthenticated');
const ProductController = require('../controllers/ProductController');

routes
    .post('/product/create', isAuthenticated, ProductController.create)
    .post('/product/buy', isAuthenticated, ProductController.buy);

module.exports = routes;