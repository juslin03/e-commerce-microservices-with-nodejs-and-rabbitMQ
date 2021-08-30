const Product = require('../models/Product');
const amqp = require('amqplib');
let channel, connnection;
/**
 * RabbitMQ connect
 */
 async function connect() {
    const amqpServer = 'amqp://localhost:5672';
    connnection = await amqp.connect(amqpServer);
    channel = await connnection.createChannel();

    try {
        await channel.assertQueue('PRODUCT');
    } catch (error) {
        if(error) console.error(error);
    }
}
connect();

let create = async (req, res) => {
    const { name, description, price } = await req.body;
    const newProduct = new Product({ name, description, price });
    try {
        let request = await newProduct.save();
        if(request) return res.status(200).json(newProduct);
    } catch (error) {
        if(error) console.error(error);
    }
}

let buy = async (req, res) => {
    const { ids } = await req.body;

    const products = await Product.findOne({ _id: { $in: ids } });
    channel.sendToQueue("ORDER",Buffer.from(JSON.stringify({products, userEmail: req.user.email})));
    // if(products.length < 0) {
    //     res.status(201).json({
    //         data: `Product not avalaible`
    //     });
    // }else{
    //     return res.status(201).json({ data: { products: products } });
    // }

}
module.exports = {
    create,
    buy
}