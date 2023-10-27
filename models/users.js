const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const userSchema = new mongoose.Schema({

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