const express = require('express');
const cors = require('cors');
const logger = require('morgan');
// const amqp = require('amqplib');
const routes = require('./routes');
require('./config/db');
const app = express();
const PORT = process.env.PORT_ONE || 9090;
let channel, connnection;
/**
 * Middlewares configurations
 */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(cors());


/**
 * Routes register
 */
app.use('/api/v1', routes);

app.listen(PORT, () => {
    console.log(`Product service started at port ${PORT}`)
})