const mongoose = require('mongoose')

const Supplier = new mongoose.Schema({
    name: String,
    address: String,
    contact: String,
    gstin: String,
    raw_material: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RawMaterial'
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

module.exports = mongoose.model('Supplier',Supplier);