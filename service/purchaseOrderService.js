const PurchaseOrders = require('../database/models/PurchaseOrderModel');
const {formatMongoData, checkObjectId} = require('../helpers/dbHelper')
const constant = require('../constants')
const mongoose = require('mongoose')
const Suppliers = require('../database/models/SupplierModel')
const Stores = require('../database/models/StoreModel')
const Rawmaterials = require('../database/models/rawMaterialModel')

module.exports.createPurchaseOrder = async (purchaseOrderData) =>{
    try{
        const {raw_ids} = purchaseOrderData;
        let ids = [];
        raw_ids.map(value=>{
            ids.push(value.id)
        })

        let raw = await Rawmaterials.find().where('_id').in(ids).exec();
        
        let data = []

        raw.map(value=>{
            data.push({_id:value,quantity:raw_ids[raw.indexOf(value)].quantity,rate:raw_ids[raw.indexOf(value)].rate})
        });
        purchaseOrderData.raw_materials = data;

        purchaseOrderData.supplier = await Suppliers.findOne({_id:purchaseOrderData.supplier_id});

        purchaseOrderData.store = await Stores.findOne({_id:purchaseOrderData.store_id});

        let purchaseOrder = new Outlets({...purchaseOrderData});
        let result = await purchaseOrder.save();
        return formatMongoData(result);
    }catch(error){
        console.log('Something went wrong: Service: createPurchaseOrder', error)
        throw new Error(error);
    }
}

module.exports.getAllPurchaseOrders = async ({skip=0, limit=10}) =>{
    try{
        let purchaseOrders = await PurchaseOrders.find({})
        .populate('supplier','name contact address gstin')
        .populate({path:'store',select:'address contact restaurant',populate:{path:'restaurant',model:'Restaurant',select:'name owner_name owner_contact'}})
        .populate('raw_materials._id')
        .populate({path:'raw_materials._id',populate:{path:'unit',model:'Unit'}})    
        .skip(parseInt(skip)).limit(parseInt(limit));
        return formatMongoData(purchaseOrders);
    }catch(error){
        console.log('Something went wrong: Service: getAllPurchaseOrders', error)
        throw new Error(error)
    }
}

module.exports.getPurchaseOrderById = async ({id}) =>{
    try{
        checkObjectId(id);
        let purchaseOrders = await PurchaseOrders.findById(id)
        .populate('supplier','name contact address gstin')
        .populate({path:'store',select:'address contact restaurant',populate:{path:'restaurant',model:'Restaurant',select:'name owner_name owner_contact'}})
        .populate('raw_materials._id')
        .populate({path:'raw_materials._id',populate:{path:'unit',model:'Unit'}});
        if(!purchaseOrders){
            throw new Error("Sorry Purchase Order not found") 
        }
        return formatMongoData(purchaseOrders);
    }catch(error){
        console.log('Something went wrong: Service: getPurchaseOrderById', error)
        throw new Error(error)
    }
}

module.exports.updatePurchaseOrder = async ({id, updateInfo}) =>{
    try{
        checkObjectId(id);
        let purchaseOrder = await PurchaseOrders.findOneAndUpdate({_id:id},updateInfo,{ new : true});
     
        if(!purchaseOrder){
            throw new Error("Sorry Purchase Order not found") 
        }
        return formatMongoData(purchaseOrders);
    }catch(error){
        console.log('Something went wrong: Service: updatePurchaseOrder', error)
        throw new Error(error)
    }
}

module.exports.deletePurchaseOrder = async ({id}) =>{
    try{
        checkObjectId(id);
        let purchaseOrder = await PurchaseOrders.findByIdAndDelete(id);
     
        if(!purchaseOrder){
            throw new Error("Sorry Purchase Order not found") 
        }
        return formatMongoData(purchaseOrder);
    }catch(error){
        console.log('Something went wrong: Service: deletePurchaseOrder', error)
        throw new Error(error)
    }
}


