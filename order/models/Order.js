const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const OrderSchema = new Schema({
    products: [
        {
            product_id: String
        }
    ],
    user: String,
    total_price: Number
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('order', OrderSchema);