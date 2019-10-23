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