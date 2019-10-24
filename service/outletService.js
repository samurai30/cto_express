const Outlets = require('../database/models/OutletModel');
const {formatMongoData, checkObjectId} = require('../helpers/dbHelper')
const constant = require('../constants')
const mongoose = require('mongoose')
const Restaurants = require('../database/models/RestaurantModel')
const users = require('../database/models/userModel')
const Rawmaterials = require('../database/models/rawMaterialModel')

module.exports.createOutlet = async (outletData) =>{
    try{
        const {raw_ids} = outletData;
        let ids = [];
        raw_ids.map(value=>{
            ids.push(value.id)
        })

        let raw = await Rawmaterials.find().where('_id').in(ids).exec();
        
        let data = []

        raw.map(value=>{
            data.push({_id:value,stock_qty:raw_ids[raw.indexOf(value)].stock_qty,threshold:raw_ids[raw.indexOf(value)].threshold})
        });
        outletData.raw_materials = data;

        outletData.restaurant = await Restaurants.findOne({_id:outletData.restaurant_id});

        outletData.manager = await users.findOne({_id:outletData.manager_id,role:"outlet_manager"});
        
        let checkManager = await Outlets.findOne({manager:outletData.manager_id});
        
        if(checkManager){
            throw new Error("Sorry this Outlet is already assigned.")
        }

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
        let outlets = await Outlets.find({})
        .populate({path:'outlet',select:'city address contact manager restaurant',
        populate:[{path:'restaurant',model:'Restaurant',select:'name owner_name owner_contact'},{path:'manager',model:'User',select:'name address'}]
        })
        .populate('restaurant','name owner_name owner_contact')
        .populate('manager','name address email contact')
        .populate('raw_materials._id')
        .populate({path:'raw_materials._id',populate:{path:'unit',model:'Unit'}})    
        .skip(parseInt(skip)).limit(parseInt(limit));
        return formatMongoData(outlets);
    }catch(error){
        console.log('Something went wrong: Service: getAllOutlets', error)
        throw new Error(error)
    }
}

module.exports.getOutletById = async ({id}) =>{
    try{
        checkObjectId(id);
        let outlet = await Outlets.findById(id)
        .populate({path:'outlet',select:'city address contact manager restaurant',
        populate:[{path:'restaurant',model:'Restaurant',select:'name owner_name owner_contact'},{path:'manager',model:'User',select:'name address'}]
        })
        .populate('restaurant','name owner_name owner_contact')
        .populate('manager','name address email contact')
        .populate('raw_materials._id')
        .populate({path:'raw_materials._id',populate:{path:'unit',model:'Unit'}});
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
