const Outlets = require('../database/models/OutletModel');
const {formatMongoData, checkObjectId} = require('../helpers/dbHelper')
const constant = require('../constants')
const mongoose = require('mongoose')
const Restaurants = require('../database/models/RestaurantModel')
const users = require('../database/models/userModel')

module.exports.createOutlet = async (outletData) =>{
    try{
        const {manager} = outletData;
        let mgr = await users.findOne().where('_id').in(manager).exec();
        outletData.manager = mgr;

        const {restaurant} = outletData;
        let restrnt = await Restaurants.findOne().where('_id').in(restaurant).exec();
        outletData.restaurant = restrnt;
            
        let outlet = new Outlets({...outletData});
        let result = await outlet.save();
        return formatMongoData(result);
    }catch(error){
        console.log('Something went wrong: Service: createOutlet', error)
        throw new Error(error);
    }
}

module.exports.getAllOutlets = async ({skip=0, limit=10}) =>{
    try{
        let outlets = await Outlets.find({}).skip(parseInt(skip)).limit(parseInt(limit));
        return formatMongoData(outlets);
    }catch(error){
        console.log('Something went wrong: Service: getAllOutlets', error)
        throw new Error(error)
    }
}

module.exports.getOutletById = async ({id}) =>{
    try{
        checkObjectId(id);
        let outlet = await Outlets.findById(id);
        if(!outlet){
            throw new Error(constant.outlet.OUTLET_NOT_FOUND) 
        }
        return formatMongoData(outlet);
    }catch(error){
        console.log('Something went wrong: Service: getOutletById', error)
        throw new Error(error)
    }
}

module.exports.updateOutlet = async ({id, updateInfo}) =>{
    try{
        checkObjectId(id);
        let outlet = await Outlets.findOneAndUpdate({_id:id},updateInfo,{ new : true});
     
        if(!outlet){
            throw new Error(constant.outlet.OUTLET_NOT_FOUND) 
        }
        return formatMongoData(outlet);
    }catch(error){
        console.log('Something went wrong: Service: updateOutlet', error)
        throw new Error(error)
    }
}

module.exports.deleteOutlet = async ({id}) =>{
    try{
        checkObjectId(id);
        let outlet = await Outlets.findByIdAndDelete(id);
     
        if(!outlet){
            throw new Error(constant.outlet.OUTLET_NOT_FOUND) 
        }
        return formatMongoData(outlet);
    }catch(error){
        console.log('Something went wrong: Service: deleteOutlet', error)
        throw new Error(error)
    }
}
