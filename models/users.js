const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const userSchema = new mongoose.Schema({

    active: {

        type: Boolean,
        default: true

    },

    name: {

        type: String,
        required: true

    },

    userid: {

        type: String,
        required: true

    },

    password: {

        type: String,
        select: false

    },

    role: {

        type: ["user","admin"],
        default: "user"

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

userSchema.plugin(mongoose_delete,{overrideMethods:'all', deletedAt:true});
module.exports = mongoose.model('User', userSchema)