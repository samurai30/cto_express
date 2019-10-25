const mongoose = require('mongoose')

const OutletRequest = new mongoose.Schema({
    date: Date,
    outlet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Outlet'
    },
    store:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    },
    raw_materials:[{
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RawMaterial'
        },
        quantity: {type: Number}
    }]
},{
    timestamps: true,
    toObject:{
        transform: function(doc,ret,options){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.updatedAt;
            delete ret.createdAt;
            return ret;
        }
    }
});

module.exports = mongoose.model('OutletRequest',OutletRequest);