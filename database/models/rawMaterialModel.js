const mongoose = require('mongoose');


const rawMaterialSchema = new mongoose.Schema({
    name:String,
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit'
    }
},
{
    timestamps: true,
    toObject: {
        transform: function(doc,ret,options){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
})
module.exports = mongoose.model('RawMaterial', rawMaterialSchema)