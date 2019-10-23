const restaurants = require('../database/models/RestaurantModel');
const {formatMongoData, checkObjectId} = require('../helpers/dbHelper');
const constant = require('../constants')

module.exports.createRestaurant = async (restaurantData) =>{
    try{
        let restaurant = new restaurants({...restaurantData});
        let result = await restaurant.save();
        return formatMongoData(result);
    }catch(error){
        console.log('Something went wrong: Service: createRestaurant', error)
        throw new Error(error);
    }
}

module.exports.getAllRestaurants = async ({skip=0, limit=10}) =>{
    try{
        let restaurant = await restaurants.find({}).skip(parseInt(skip)).limit(parseInt(limit));
        return formatMongoData(restaurant);
    }catch(error){
        console.log('Something went wrong: Service: getAllRestaurants', error)
        throw new Error(error)
    }
}

module.exports.getRestaurantById = async ({id}) =>{
    try{
        checkObjectId(id);
        let restaurant = await restaurants.findById(id);
        if(!restaurant){
            throw new Error(constant.restaurant.RESTAURANT_NOT_FOUND) 
        }
        return formatMongoData(restaurant);
    }catch(error){
        console.log('Something went wrong: Service: getCategoryById', error)
        throw new Error(error)
    }
}

module.exports.updateRestaurant = async ({id, updateInfo}) =>{
    try{
        checkObjectId(id);
        let restaurant = await restaurants.findOneAndUpdate({_id:id},updateInfo,{ new : true});
     
        if(!restaurant){
            throw new Error(constant.restaurant.RESTAURANT_NOT_FOUND) 
        }
        return formatMongoData(restaurant);
    }catch(error){
        console.log('Something went wrong: Service: updateRestaurant', error)
        throw new Error(error)
    }
}

module.exports.deleteRestaurant = async ({id}) =>{
    try{
        checkObjectId(id);
        let restaurant = await restaurants.findByIdAndDelete(id);
     
        if(!restaurant){
            throw new Error(constant.restaurant.RESTAURANT_NOT_FOUND) 
        }
        return formatMongoData(restaurant);
    }catch(error){
        console.log('Something went wrong: Service: deleteRestaurant', error)
        throw new Error(error)
    }
}
