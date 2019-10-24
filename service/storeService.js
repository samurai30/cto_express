const Store = require('../database/models/StoreModel');
const {formatMongoData, checkObjectId} = require('../helpers/dbHelper');
const constant = require('../constants')
const Rawmaterials = require('../database/models/rawMaterialModel')
const Manager = require('../database/models/userModel')
const Restaurant = require('../database/models/RestaurantModel')
const Outlets = require('../database/models/OutletModel')
module.exports.createStore = async (storeData) =>{
    try{
        const {raw_ids,outlet_ids} = storeData;
        let ids = [];
        raw_ids.map(value=>{
            ids.push(value.id)
        });
        let raw = await Rawmaterials.find().where('_id').in(ids).exec();
        let outlet = await Outlets.find().where('_id').in(outlet_ids).exec();

        let data = [];

        raw.map(value=>{
            data.push({_id:value,stock_qty:raw_ids[raw.indexOf(value)].stock_qty,threshold:raw_ids[raw.indexOf(value)].threshold})
        });

        storeData.raw_materials = data;
        storeData.manager = await Manager.findOne({_id:storeData.manager_id,role:"store_manager"});
        storeData.restuarant = await Restaurant.findOne({_id:storeData.restaurant_id});
        storeData.outlet = outlet;
        let checkManager = await Store.findOne({manager:storeData.manager_id})
        if(checkManager){
            throw new Error("Sorry this store is already assigned.")
        }
        let store = new Store({...storeData});
        let result = await store.save();
        return formatMongoData(result);
    }catch(error){
        console.log('Something went wrong: Service: createStore', error)
        throw new Error(error);
    }
}

module.exports.getAllStores = async ({skip=0, limit=10}) =>{
    try{
        let store = await Store.find({})
        .populate({path:'outlet',select:'city address contact manager restaurant',
        populate:[{path:'restaurant',model:'Restaurant',select:'name owner_name owner_contact'},{path:'manager',model:'User',select:'name address'}]
        })
        .populate('restuarant','name owner_name owner_contact')
        .populate('manager','name address email contact')
        .populate('raw_materials._id')
        .populate({path:'raw_materials._id',populate:{path:'unit',model:'Unit'}})
        .skip(parseInt(skip)).limit(parseInt(limit));

        return formatMongoData(store);
    }catch(error){
        console.log('Something went wrong: Service: getAllStores', error)
        throw new Error(error)
    }
}

module.exports.getStoreById = async ({id}) =>{
    try{
        checkObjectId(id);
        let store = await Store.findById(id)
        .populate({path:'outlet',select:'city address contact manager restaurant',
        populate:[{path:'restaurant',model:'Restaurant',select:'name owner_name owner_contact'},{path:'manager',model:'User',select:'name address'}]
        })
        .populate('restuarant','name owner_name owner_contact')
        .populate('manager','name address email contact')
        .populate('raw_materials._id')
        .populate({path:'raw_materials._id',populate:{path:'unit',model:'Unit'}});
        if(!store){
            throw new Error("Sorry store not found") 
        }
        return formatMongoData(store);
    }catch(error){
        console.log('Something went wrong: Service: getStoreById', error)
        throw new Error(error)
    }
}

module.exports.updateStore = async ({id, updateInfo}) =>{
    try{
        checkObjectId(id);
        let store = await Store.findOneAndUpdate({_id:id},updateInfo,{ new : true});
     
        if(!store){
            throw new Error("Sorry store not found") 
        }
        return formatMongoData(store);
    }catch(error){
        console.log('Something went wrong: Service: updateStore', error)
        throw new Error(error)
    }
}

module.exports.deleteStore = async ({id}) =>{
    try{
        checkObjectId(id);
        let store = await Store.findByIdAndDelete(id);
     
        if(!store){
            throw new Error("Sorry store not found") 
        }
        return formatMongoData(store);
    }catch(error){
        console.log('Something went wrong: Service: deleteStore', error)
        throw new Error(error)
    }
}
