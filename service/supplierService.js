const Suppliers = require('../database/models/SupplierModel');
const {formatMongoData, checkObjectId} = require('../helpers/dbHelper');
const constants = require('../constants')

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
        console.log('Something went wrong: Service: getAllProducts', error)
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

module.exports.updateSupplier = async ({id}) =>{
    try{
     checkObjectId(id);
     let rawmaterial = await RawMaterial.findById(id);
     if(!rawmaterial){
       throw new Error(constant.rawMaterial.RAW_MATERIAL_NOT_FOUND) 
     }
     return formatMongoData(rawmaterial);
    }catch(error){
      console.log('Something went wrong: Service: updateRawMaterial', error)
      throw new Error(error)
    }
}