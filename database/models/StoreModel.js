const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    address: String,
    contact: String,
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'   
    },
    manager:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    raw_materials:[{
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RawMaterial'
        },
        stock_qty: {type: Number},
        threshold: {type: Number}
    }],
    outlet:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Outlet'
    }],
    supplier:[
        {type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'}
    ]
},
{
    timestamps: true,
    toObject:{
        transform: function(doc,ret,options){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt
            return ret;
        }
    }
});

module.exports = mongoose.model('Store',storeSchema);