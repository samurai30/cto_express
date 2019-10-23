const mongoose = require('mongoose');


const unitsSchema = new mongoose.Schema({
    designation:String,
    primary_name: String,
    secondary_name: String
},
{
    timestamps: true,
    toObject: {
        transform: function(doc,ret,options){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
            return ret;
        }
    }
})
module.exports = mongoose.model('Unit', unitsSchema)