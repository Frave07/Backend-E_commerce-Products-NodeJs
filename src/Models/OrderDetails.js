
const { Schema, model } = require('mongoose');

const orderDetailsSchema = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    orderBuy_id: {
        type: Schema.Types.ObjectId,
        ref: 'orderBuy'
    },
    quantity: {
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});

module.exports = model('orderdetails', orderDetailsSchema );