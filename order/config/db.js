const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/order-db";
const db = mongoose.connection;
const config = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(URI,config);

db.on('open', () => {
    console.log('Order service DB connected successfully !');
}).on('error', (err) => {
    console.error('error occured. See =>', err);
}).on('close', () => {
    console.log(`You are no longer connected to Mongo`);
});

module.exports = mongoose;