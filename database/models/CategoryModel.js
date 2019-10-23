const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String,
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

module.exports = mongoose.model('Category',categorySchema);