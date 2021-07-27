
const { Schema, model } = require('mongoose');

const productsSchema = new Schema({
    nameProduct:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    codeProduct: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        default: 'Active'
    },
    picture:{
        type: String,
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    }
});

module.exports = model('products', productsSchema );