const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('Item',ItemSchema);