const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  
    items: {
      
      type: Array,
      required: true,
      
    },

    total: {
      type: Number,
      required: true,
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false, 
  });

module.exports = mongoose.model('Ticket', ticketSchema);
