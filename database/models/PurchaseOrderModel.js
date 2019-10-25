const mongoose = require('mongoose')

const PurchaseOrder = new mongoose.Schema({
    date: Date,
    total_amount: Number,
    gst: String,
    grand_total: Number,
    invoice_no:String,
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
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

module.exports = mongoose.model('PurchaseOrder',PurchaseOrder);