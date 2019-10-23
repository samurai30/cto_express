const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    address: String,
    contact: String,
    email: String,
    password: String
},{
    timestamps: true,
    toObject:{
        transform: function(doc,ret,options){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password
            delete ret.__v;
            delete ret.createdAt,
            delete ret.updatedAt
            return ret;
        }
    }
});

userSchema.plugin(require('mongoose-role'),{
    roles: ['super_admin','store_manager','outlet_manager'],
    accessLevels:{
        outlet_manager: ['super_admin','outlet_manager'],
        store_manager: ['store_manager','super_admin'],
        super_admin: ['super_admin']
    }
});

module.exports = mongoose.model('User',userSchema);