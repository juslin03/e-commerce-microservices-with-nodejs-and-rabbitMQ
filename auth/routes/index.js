const routes = require('express').Router();
const UserController = require('../controllers/UserController');

routes
    .post('/auth/register', UserController.register)
    .post('/auth/login', UserController.login);

module.exports = routes;