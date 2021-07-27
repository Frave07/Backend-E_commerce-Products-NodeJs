
const { Schema, model } = require('mongoose');

const favoriteSchema = new Schema({
    product_id:{
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('favorite', favoriteSchema );