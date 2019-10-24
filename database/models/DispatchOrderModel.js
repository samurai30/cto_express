const mongoose = require('mongoose')

const DispatchOrder = new mongoose.Schema({
    date: Date,
    total_amount: Number,
    gst: Number,
    grand_total: Number,
    invoice_no:String,
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
        quantity: {type: Number},
        rate: {type: Number}
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

module.exports = mongoose.model('DispatchOrder',DispatchOrder);