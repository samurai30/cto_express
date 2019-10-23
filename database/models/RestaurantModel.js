const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: String,
    owner_name: String,
    owner_contact: Number
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

module.exports = mongoose.model('Restaurant',restaurantSchema);