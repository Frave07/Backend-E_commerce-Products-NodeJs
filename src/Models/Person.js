const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const personSchema = new Schema({
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    address:{
        type: String,
        required: false
    },
    reference:{
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('person', personSchema );