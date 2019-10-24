const OutletRequests = require('../database/models/OutletRequestModel');
const {formatMongoData, checkObjectId} = require('../helpers/dbHelper')
const constant = require('../constants')
const mongoose = require('mongoose')
const Outlets = require('../database/models/OutletModel')
const Stores = require('../database/models/StoreModel')
const Rawmaterials = require('../database/models/rawMaterialModel')

module.exports.createOutletRequest = async (outletRequestData) =>{
    try{
        const {raw_ids} = outletRequestData;
        let ids = [];
        raw_ids.map(value=>{
            ids.push(value.id)
        })

        let raw = await Rawmaterials.find().where('_id').in(ids).exec();
        
        let data = []

        raw.map(value=>{
            data.push({_id:value,quantity:raw_ids[raw.indexOf(value)].quantity})
        });
        outletRequestData.raw_materials = data;

        outletRequestData.outlet = await Outlets.findOne({_id:outletRequestData.outlet_id});

        outletRequestData.store = await Stores.findOne({_id:outletRequestData.store_id});

        let outletRequest = new Outlets({...outletRequestData});
        let result = await outletRequest.save();
        return formatMongoData(result);
    }catch(error){
        console.log('Something went wrong: Service: createOutletRequest', error)
        throw new Error(error);
    }
}

module.exports.getAllOutletRequests = async ({skip=0, limit=10}) =>{
    try{
        let outletRequests = await OutletRequests.find({})
        .populate({path:'outlet',select:'city address contact restaurant',populate:{path:'restaurant',model:'Restaurant',select:'name owner_name owner_contact'}})
        .populate({path:'store',select:'address contact restaurant',populate:{path:'restaurant',model:'Restaurant',select:'name owner_name owner_contact'}})
        .populate('raw_materials._id')
        .populate({path:'raw_materials._id',populate:{path:'unit',model:'Unit'}})    
        .skip(parseInt(skip)).limit(parseInt(limit));
        return formatMongoData(outletRequests);
    }catch(error){
        console.log('Something went wrong: Service: getAllOutletRequests', error)
        throw new Error(error)
    }
}

module.exports.OutletRequest = async ({id}) =>{
    try{
        checkObjectId(id);
        let outletRequests = await OutletRequests.findById(id)
        .populate({path:'outlet',select:'city address contact restaurant',populate:{path:'restaurant',model:'Restaurant',select:'name owner_name owner_contact'}})
        .populate({path:'store',select:'address contact restaurant',populate:{path:'restaurant',model:'Restaurant',select:'name owner_name owner_contact'}})
        .populate('raw_materials._id')
        .populate({path:'raw_materials._id',populate:{path:'unit',model:'Unit'}});
        if(!outletRequests){
            throw new Error("Sorry Outlet Request not found") 
        }
        return formatMongoData(outletRequests);
    }catch(error){
        console.log('Something went wrong: Service: OutletRequest', error)
        throw new Error(error)
    }
}

module.exports.updateoutletRequests = async ({id, updateInfo}) =>{
    try{
        checkObjectId(id);
        let outletRequest = await OutletRequests.findOneAndUpdate({_id:id},updateInfo,{ new : true});
     
        if(!outletRequest){
            throw new Error("Sorry Outlet Request not found") 
        }
        return formatMongoData(outletRequest);
    }catch(error){
        console.log('Something went wrong: Service: updateoutletRequests', error)
        throw new Error(error)
    }
}

module.exports.deleteOutletRequest = async ({id}) =>{
    try{
        checkObjectId(id);
        let outletRequest = await OutletRequests.findByIdAndDelete(id);
     
        if(!outletRequest){
            throw new Error("Sorry Outlet Request not found") 
        }
        return formatMongoData(outletRequest);
    }catch(error){
        console.log('Something went wrong: Service: deleteOutletRequest', error)
        throw new Error(error)
    }
}


