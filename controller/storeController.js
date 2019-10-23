const constants = require('../constants')
const storeService = require('../service/storeService')


module.exports.createStore = async (req,res) =>{
    let response = {...constants.defaultServerResponse}

    try{
        const responseFromService = await storeService.createStore(req.body);
        response.status = 200;
        response.message = "Store Created";
        response.body = responseFromService;

    }catch(error){
        console.log('Something went wrong: Controller: createStore');
        response.message = error.message;
        response.message = error.message
    }
    return res.status(response.status).send(response)
}

module.exports.getAllStores = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await storeService.getAllStores(req.query);
        response.status = 200;
        response.message = "Store Fetched";
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: getAllStores');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.getStoreById = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await storeService.getStoreById(req.params);
        response.status = 200;
        response.message = "Store Fetched";
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: getStoreById');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.updateStore = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await storeService.updateStore({
            id: req.params.id,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = "Store Updated";
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: updateStore');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.deleteStore = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await storeService.deleteStore(req.params);
        response.status = 200;
        response.message = "Store Deleted";
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: deleteStore');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}