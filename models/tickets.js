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
      
    },

    createdBy: {

      type: mongoose.Types.ObjectId,
      required: true

    },

    updatedBy: {

      type: mongoose.Types.ObjectId,
      required: true

    },

    createdByDisplayValue: {

      type: String,
      required: true

    },

    updatedByDisplayValue: {

      type: String,
      required: true

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
