const mongoose = require('mongoose')

const Outlet = new mongoose.Schema({
    city: String,
    address: String,
    contact: String,
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    raw_materials:[{
        _id:{
            type: mongoose.Schema.Types.Object,
            ref: 'RawMaterial'
        },
        stock_qty: {type: Number},
        threshold: {type: Number}
    }]
},{
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

module.exports = mongoose.model('Outlet',Outlet);