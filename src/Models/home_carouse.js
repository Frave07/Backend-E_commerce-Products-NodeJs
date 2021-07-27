
const { Schema, model } = require('mongoose');

const CarouselSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    }
});

module.exports = model('home_carousel', CarouselSchema );