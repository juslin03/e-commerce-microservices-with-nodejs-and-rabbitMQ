const Order = require('../models/Order');
// const jwt = require('jsonwebtoken');

let create = async (req, res) => {
    const { name, description, price } = await req.body;

    // const product = await Product.findOne({email});

    const newOrder = new Order({ name, description, price });
    // if(Order) {
    //     res.status(201).json({
    //         data: `Order already exists with this email ${email}`
    //     });
    // }else{
    try {
        let request = await newOrder.save();
        if(request) return res.status(200).json(newOrder);
    } catch (error) {
        if(error) console.error(error);
    }
    // }

}

let buy = async (req, res) => {
    const { ids } = await req.body;

    const products = await Product.findOne({ _id: { $in: ids } });

    if(products.length < 0) {
        res.status(201).json({
            data: `Product not avalaible`
        });
    }else{
        return res.status(201).json({ data: { products: products } })
        // if (password !== Product.password) {
        //     return res.json({ data: { message: `Incorrect Password` } });
        // }
        // const payload = {
        //     email,
        //     name: Product.name
        // }
        // jwt.sign(payload, 'eyalogroup', (err, token) => {
        //     if(err) res.json({ data: {error: err} });
        //     return res.json({ token: token });
        // })
        // const newProduct = new Product({ email, password });
        // try {
        //     let request = await newProduct.save();
        //     if(request) res.status(200).json(newProduct);
        // } catch (error) {
        //     if(error) console.error(error);
        // }
    }

}
module.exports = {
    create,
    buy
}