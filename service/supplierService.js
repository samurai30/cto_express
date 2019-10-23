const Suppliers = require('../database/models/SupplierModel');
const {formatMongoData, checkObjectId} = require('../helpers/dbHelper');
const constant = require('../constants')

module.exports.createSupplier = async (supplierData) =>{
    try{
        let supplier = new Suppliers({...supplierData});
        let result = await supplier.save();
        return formatMongoData(result);
    }catch(error){
        console.log('Something went wrong: Service: createSupplier', error)
        throw new Error(error);
    }
}

module.exports.getAllSuppliers = async ({skip=0, limit=10}) =>{
    try{
        let suppliers = await Suppliers.find({}).skip(parseInt(skip)).limit(parseInt(limit));
        return formatMongoData(suppliers);
    }catch(error){
        console.log('Something went wrong: Service: getAllSuppliers', error)
        throw new Error(error)
    }
}

module.exports.getSupplierById = async ({id}) =>{
    try{
        checkObjectId(id);
        let supplier = await Suppliers.findById(id);
        if(!supplier){
            throw new Error(constant.supplier.SUPPLIER_NOT_FOUND) 
        }
        return formatMongoData(supplier);
    }catch(error){
        console.log('Something went wrong: Service: getSupplierById', error)
        throw new Error(error)
    }
}

module.exports.updateSupplier = async ({id, updateInfo}) =>{
    try{
        checkObjectId(id);
        let supplier = await Suppliers.findOneAndUpdate({_id:id},updateInfo,{ new : true});
     
        if(!supplier){
            throw new Error(constant.supplier.SUPPLIER_NOT_FOUND) 
        }
        return formatMongoData(supplier);
    }catch(error){
        console.log('Something went wrong: Service: updateSupplier', error)
        throw new Error(error)
    }
}

module.exports.deleteSupplier = async ({id}) =>{
    try{
        checkObjectId(id);
        let supplier = await Suppliers.findByIdAndDelete(id);
     
        if(!supplier){
            throw new Error(constant.supplier.SUPPLIER_NOT_FOUND) 
        }
        return formatMongoData(supplier);
    }catch(error){
        console.log('Something went wrong: Service: deleteSupplier', error)
        throw new Error(error)
    }
}
