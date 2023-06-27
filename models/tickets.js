const mongoose = require('mongoose');

let TicketSchema = new mongoose.Schema(
    {
        items: [
            {
                name: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    {
        toJSON: {virtuals:true},
        toObject: {virtuals:true},
        timestamps: true,
        versionKey: false
    });

module.exports = mongoose.model('ticketSchema', TicketSchema);