const categories = require('../database/models/CategoryModel');
const {formatMongoData, checkObjectId} = require('../helpers/dbHelper');
const constant = require('../constants')

module.exports.createCategory = async (categoryData) =>{
    try{
        let category = new categories({...categoryData});
        let result = await category.save();
        return formatMongoData(result);
    }catch(error){
        console.log('Something went wrong: Service: createCategory', error)
        throw new Error(error);
    }
}

module.exports.getAllCategories = async ({skip=0, limit=10}) =>{
    try{
        let category = await categories.find({}).skip(parseInt(skip)).limit(parseInt(limit));
        return formatMongoData(category);
    }catch(error){
        console.log('Something went wrong: Service: getAllCategories', error)
        throw new Error(error)
    }
}

module.exports.getCategoryById = async ({id}) =>{
    try{
        checkObjectId(id);
        let category = await categories.findById(id);
        if(!category){
            throw new Error(constant.category.CATEGORY_NOT_FOUND) 
        }
        return formatMongoData(category);
    }catch(error){
        console.log('Something went wrong: Service: getCategoryById', error)
        throw new Error(error)
    }
}

module.exports.updateCategory = async ({id, updateInfo}) =>{
    try{
        checkObjectId(id);
        let category = await categories.findOneAndUpdate({_id:id},updateInfo,{ new : true});
     
        if(!category){
            throw new Error(constant.category.CATEGORY_NOT_FOUND) 
        }
        return formatMongoData(category);
    }catch(error){
        console.log('Something went wrong: Service: updateCategory', error)
        throw new Error(error)
    }
}

module.exports.deleteCategory = async ({id}) =>{
    try{
        checkObjectId(id);
        let category = await categories.findByIdAndDelete(id);
     
        if(!category){
            throw new Error(constant.category.CATEGORY_NOT_FOUND) 
        }
        return formatMongoData(supplier);
    }catch(error){
        console.log('Something went wrong: Service: deleteCategory', error)
        throw new Error(error)
    }
}
