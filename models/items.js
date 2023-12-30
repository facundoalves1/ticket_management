const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    code: {
        type: Number,
        require: true
    },

    category: {

        type: String,
        required: true,
        default: "General"

    }

},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false, 
});

module.exports = mongoose.model('Item',ItemSchema);