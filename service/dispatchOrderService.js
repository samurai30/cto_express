const DispatchOrders = require('../database/models/DispatchOrderModel');
const {formatMongoData, checkObjectId} = require('../helpers/dbHelper')
const constant = require('../constants')
const mongoose = require('mongoose')
const Outlets = require('../database/models/OutletModel')
const Stores = require('../database/models/StoreModel')
const Rawmaterials = require('../database/models/rawMaterialModel')

module.exports.createDispatchOrder = async (dispatchOrderData) =>{
    try{
        const {raw_ids} = dispatchOrderData;
        let ids = [];
        raw_ids.map(value=>{
            ids.push(value.id)
        })

        let raw = await Rawmaterials.find().where('_id').in(ids).exec();
        
        let data = []

        raw.map(value=>{
            data.push({_id:value,quantity:raw_ids[raw.indexOf(value)].quantity,rate:raw_ids[raw.indexOf(value)].rate})
        });
        dispatchOrderData.raw_materials = data;

        dispatchOrderData.outlet = await Outlets.findOne({_id:dispatchOrderData.outlet_id});

        dispatchOrderData.store = await Stores.findOne({_id:dispatchOrderData.store_id});

        let dispatchOrder = new Outlets({...dispatchOrderData});
        let result = await dispatchOrder.save();
        return formatMongoData(result);
    }catch(error){
        console.log('Something went wrong: Service: createDispatchOrder', error)
        throw new Error(error);
    }
}

module.exports.getAllDispatchOrders = async ({skip=0, limit=10}) =>{
    try{
        let dispatchOrders = await DispatchOrders.find({})
        .populate({path:'outlet',select:'city address contact restaurant',populate:{path:'restaurant',model:'Restaurant',select:'name owner_name owner_contact'}})
        .populate({path:'store',select:'address contact restaurant',populate:{path:'restaurant',model:'Restaurant',select:'name owner_name owner_contact'}})
        .populate('raw_materials._id')
        .populate({path:'raw_materials._id',populate:{path:'unit',model:'Unit'}})    
        .skip(parseInt(skip)).limit(parseInt(limit));
        return formatMongoData(dispatchOrders);
    }catch(error){
        console.log('Something went wrong: Service: getAllDispatchOrders', error)
        throw new Error(error)
    }
}

module.exports.getDispatchOrderById = async ({id}) =>{
    try{
        checkObjectId(id);
        let dispatchOrders = await DispatchOrders.findById(id)
        .populate({path:'outlet',select:'city address contact restaurant',populate:{path:'restaurant',model:'Restaurant',select:'name owner_name owner_contact'}})
        .populate({path:'store',select:'address contact restaurant',populate:{path:'restaurant',model:'Restaurant',select:'name owner_name owner_contact'}})
        .populate('raw_materials._id')
        .populate({path:'raw_materials._id',populate:{path:'unit',model:'Unit'}});
        if(!dispatchOrders){
            throw new Error("Sorry Dispatch Order not found") 
        }
        return formatMongoData(dispatchOrders);
    }catch(error){
        console.log('Something went wrong: Service: getDispatchOrderById', error)
        throw new Error(error)
    }
}

module.exports.updateDispatchOrder = async ({id, updateInfo}) =>{
    try{
        checkObjectId(id);
        let dispatchOrder = await DispatchOrders.findOneAndUpdate({_id:id},updateInfo,{ new : true});
     
        if(!dispatchOrder){
            throw new Error("Sorry Dispatch Order not found") 
        }
        return formatMongoData(dispatchOrder);
    }catch(error){
        console.log('Something went wrong: Service: updateDispatchOrder', error)
        throw new Error(error)
    }
}

module.exports.deleteDispatchOrder = async ({id}) =>{
    try{
        checkObjectId(id);
        let dispatchOrder = await DispatchOrders.findByIdAndDelete(id);
     
        if(!dispatchOrder){
            throw new Error("Sorry Dispatch Order not found") 
        }
        return formatMongoData(dispatchOrder);
    }catch(error){
        console.log('Something went wrong: Service: deleteDispatchOrder', error)
        throw new Error(error)
    }
}


