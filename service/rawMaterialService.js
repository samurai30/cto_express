const RawMaterial = require('../database/models/rawMaterialModel');
const {formatMongoData, checkObjectId} = require('../helpers/dbHelper')
const constant = require('../constants')

module.exports.createRawMaterial = async (rawData) =>{
   try{
    let raw = new RawMaterial({...rawData})
    let result = await raw.save();
    return formatMongoData(result);
   }catch(error){
     console.log('Something went wrong: Service: createRawMaterial')
     throw new Error(error)
   }
}

module.exports.getAllRawMaterials = async ({skip=0, limit=10}) =>{
  try{
 
   let rawmaterials = await RawMaterial.find({}).skip(parseInt(skip)).limit(parseInt(limit));
   return formatMongoData(rawmaterials);
  }catch(error){
    console.log('Something went wrong: Service: getAllProducts')
    throw new Error(error)
  }
}

module.exports.getRawMaterialById = async ({id}) =>{
  try{
   checkObjectId(id)
   let rawmaterial = await RawMaterial.findById(id);
   if(!rawmaterial){
     throw new Error(constant.rawMaterial.RAW_MATERIAL_NOT_FOUND) 
   }
   return formatMongoData(rawmaterial);
  }catch(error){
    console.log('Something went wrong: Service: getRawMaterialById')
    throw new Error(error)
  }
}