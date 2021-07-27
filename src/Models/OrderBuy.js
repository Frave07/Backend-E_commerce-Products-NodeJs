

const { Schema, model } = require('mongoose');

const orderBuySchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        red: 'users'
    },
    receipt: {
        type: String,
        required: true
    },
    datee: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

module.exports = model('orderBuy', orderBuySchema );