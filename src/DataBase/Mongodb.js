const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/products', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then( db => console.log('Mongodb is connnected'))
.catch(err => console.log(err));

