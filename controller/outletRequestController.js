const constants = require('../constants')
const outletRequestService = require('../service/outletRequestService')

module.exports.createOutletRequest = async (req,res) =>{
    let response = {...constants.defaultServerResponse}

    try{
        const responseFromService = await outletRequestService.createOutletRequest(req.body);
        response.status = 200;
        response.message = constants.outletRequest.OUTLET_REQUEST_CREATED;
        response.body = responseFromService;

    }catch(error){
        console.log('Something went wrong: Controller: createOutletRequest');
        response.message = error.message;
        response.message = error.message
    }
    return res.status(response.status).send(response)
}

module.exports.getAllOutletRequests = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await outletRequestService.getAllOutletRequests(req.query);
        response.status = 200;
        response.message = constants.outletRequest.OUTLET_REQUEST_FETCHED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: getAllOutletRequests');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.getOutletRequestById = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await outletRequestService.getOutletRequestById(req.params);
        response.status = 200;
        response.message = constants.outletRequest.OUTLET_REQUEST_FETCHED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: getOutletRequestById');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.updateOutletRequest = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await outletRequestService.updateOutletRequest({
            id: req.params.id,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = constants.outletRequest.OUTLET_REQUEST_UPDATED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: updateOutletRequest');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.deleteOutletRequest = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await outletRequestService.deleteOutletRequest(req.params);
        response.status = 200;
        response.message = constants.outletRequest.OUTLET_REQUEST_DELETED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: deleteOutletRequest');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}