
const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    category: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    }
});

module.exports = model('category', categorySchema );

