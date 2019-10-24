const RawMaterial = require('../database/models/rawMaterialModel');
const {formatMongoData, checkObjectId} = require('../helpers/dbHelper')
const constant = require('../constants')
const Units = require('../database/models/UnitsModel')
const Category = require('../database/models/CategoryModel')
module.exports.createRawMaterial = async ({name,unit_id,cat_id}) =>{
   try{
    checkObjectId(unit_id);
    checkObjectId(cat_id);
    let unit = await Units.findById(unit_id)
    let cat = await Category.findById(cat_id)
    if(!unit){
      throw new Error("Sorry cloudn't find any units with id: "+unit_id)
    }
    if(!cat){
      throw new Error("Sorry cloudn't find any category with id: "+cat_id)
    }

    let rawmaterial = await RawMaterial.findOne({name:name.toLowerCase()})
     
    if(rawmaterial){
      throw new Error("This item already exists")
    }
    let raw = new RawMaterial({name:name.toLowerCase(),unit,category:cat})
    let result = await raw.save();
    return formatMongoData(result);
   }catch(error){
     console.log('Something went wrong: Service: createRawMaterial', error)
     throw new Error(error)
   }
}

module.exports.getAllRawMaterials = async ({skip=0, limit=10}) =>{
  try{
 
   let rawmaterials = await RawMaterial.find({}).populate('unit').populate('category').skip(parseInt(skip)).limit(parseInt(limit));
   return formatMongoData(rawmaterials);
  }catch(error){
    console.log('Something went wrong: Service: getAllProducts', error)
    throw new Error(error)
  }
}

module.exports.getRawMaterialById = async ({id}) =>{
  try{
   checkObjectId(id);
   let rawmaterial = await RawMaterial.findById(id);
   if(!rawmaterial){
     throw new Error(constant.rawMaterial.RAW_MATERIAL_NOT_FOUND) 
   }
   return formatMongoData(rawmaterial);
  }catch(error){
    console.log('Something went wrong: Service: getRawMaterialById', error)
    throw new Error(error)
  }
}

module.exports.updateRawMaterial = async ({id, updateInfo}) =>{
  try{
   checkObjectId(id);
   let rawmaterial = await RawMaterial.findOneAndUpdate({_id:id},updateInfo,{ new : true});
   
   if(!rawmaterial){
     throw new Error(constant.rawMaterial.RAW_MATERIAL_NOT_FOUND) 
   }
   return formatMongoData(rawmaterial);
  }catch(error){
    console.log('Something went wrong: Service: updateRawMaterial', error)
    throw new Error(error)
  }
}

module.exports.deleteRawMaterial = async ({id}) =>{
  try{
   checkObjectId(id);
   let rawmaterial = await RawMaterial.findByIdAndDelete(id);
   
   if(!rawmaterial){
     throw new Error(constant.rawMaterial.RAW_MATERIAL_NOT_FOUND) 
   }
   return formatMongoData(rawmaterial);
  }catch(error){
    console.log('Something went wrong: Service: deleteRawMaterial', error)
    throw new Error(error)
  }
}