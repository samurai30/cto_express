const constants = require('../constants')
const restaurantService = require('../service/restaurantService')

module.exports.createRestaurant = async (req,res) =>{
    let response = {...constants.defaultServerResponse}

    try{
        const responseFromService = await restaurantService.createRestaurant(req.body);
        response.status = 200;
        response.message = constants.restaurant.RESTAURANT_CREATED;
        response.body = responseFromService;

    }catch(error){
        console.log('Something went wrong: Controller: createRestaurant');
        response.message = error.message
    }
    return res.status(response.status).send(response)
}

module.exports.getAllRestaurants = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await restaurantService.getAllRestaurants(req.query);
        response.status = 200;
        response.message = constants.restaurant.RESTAURANT_FETCHED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: getAllRestaurants');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.getRestaurantById = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await restaurantService.getRestaurantById(req.params);
        response.status = 200;
        response.message = constants.restaurant.RESTAURANT_FETCHED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: getRestaurantById');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.updateRestaurant = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await restaurantService.updateRestaurant({
            id: req.params.id,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = constants.restaurant.RESTAURANT_UPDATED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: updateRestaurant');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.deleteRestaurant = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await restaurantService.deleteRestaurant(req.params);
        response.status = 200;
        response.message = constants.restaurant.RESTAURANT_DELETED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: deleteRestaurant');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}