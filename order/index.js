const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const amqp = require('amqplib');
const routes = require('./routes');
require('./config/db');
const app = express();
const PORT = process.env.PORT_ONE || 2250;
let channel, connnection;
/**
 * Middlewares configurations
 */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(cors());

/**
 * RabbitMQ connect
 */
async function connect() {
    const amqpServer = 'amqp://localhost:5672';
    connnection = await amqp.connect(amqpServer);
    channel = await connnection.createChannel();

    try {
        await channel.assertQueue('ORDER');
    } catch (error) {
        
    }
}
connect().then(() => {
    channel.consume('ORDER', data => {
        const { products, userEmail } = JSON.parse(data.content);
        console.log(`Consuming ORDER Queue\n`)
        console.log(products, userEmail);
    })
});
/**
 * Routes register
 */
// app.use('/api/v1', routes);

app.listen(PORT, () => {
    console.log(`Order service started at port ${PORT}`)
})