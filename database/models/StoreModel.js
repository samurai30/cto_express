const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    address: String,
    contact: String,
    restuarant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'   
    },
    manager:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    raw_materials:[{
        _id:{
            type: mongoose.Schema.Types.Object,
            ref: 'RawMaterial'
        },
        stock_qty: {type: Number},
        threshold: {type: Number}
    }]
},
{
    timestamps: true,
    toObject:{
        transform: function(doc,ret,options){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

module.exports = mongoose.model('Store',storeSchema);