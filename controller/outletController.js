const constants = require('../constants')
const outletService = require('../service/outletService')


module.exports.createOutlet = async (req,res) =>{
    let response = {...constants.defaultServerResponse}

    try{
        const responseFromService = await outletService.createOutlet(req.body);
        response.status = 200;
        response.message = constants.outlet.OUTLET_CREATED;
        response.body = responseFromService;

    }catch(error){
        console.log('Something went wrong: Controller: createOutlet');
        response.message = error.message;
        response.message = error.message
    }
    return res.status(response.status).send(response)
}

module.exports.getAllOutlets = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await outletService.getAllOutlets(req.query);
        response.status = 200;
        response.message = constants.outlet.OUTLET_FETCHED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: getAllOutlets');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.getOutletById = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await outletService.getOutletById(req.params);
        response.status = 200;
        response.message = constants.outlet.OUTLET_FETCHED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: getOutletById');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.updateOutlet = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await outletService.updateOutlet({
            id: req.params.id,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = constants.outlet.OUTLET_UPDATED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: updateOutlet');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.deleteOutlet = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await outletService.deleteOutlet(req.params);
        response.status = 200;
        response.message = constants.outlet.OUTLET_DELETED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: deleteOutlet');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}