const { lookup } = require("dns");
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
    statics: {
      findByUser(_id){
       return this.aggregate([
          {
            $lookup: {

              from: 'users',
              localField: 'createdBy',
              foreignField: '_id',
              as: 'user'

            }
          },
          {
            $match: {

              createdBy: new mongoose.Types.ObjectId(_id)

            }
          },
          {

            $unwind: '$user'

          },
          {
            $project: {

              'user.password': 0

            }
          }
        ])
      }
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
