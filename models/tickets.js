const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

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

ticketSchema.plugin(mongoose_delete,{overrideMethods:"all", deletedAt:true});  
module.exports = mongoose.model('Ticket', ticketSchema);
