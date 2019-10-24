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

