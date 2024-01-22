const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const ItemSchema = new mongoose.Schema({

  name: {
      type: String,
      required: true
  },

  price: {
      type: Number,
      required: true
  },

  barcode: {
      type: String,
      required: true
  },

  internalcode: {
    type: String,
    required: true
  },

  quantity: {
      type: Number,
      required:true
  }

},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true,
  versionKey: false, 
});

const ticketSchema = new mongoose.Schema({
  
    items: [ItemSchema],

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
  });

ticketSchema.plugin(mongoose_delete,{overrideMethods:"all", deletedAt:true});  
module.exports = mongoose.model('Ticket', ticketSchema);