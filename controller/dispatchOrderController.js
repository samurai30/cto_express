const constants = require('../constants')
const dispatchOrderService = require('../service/dispatchOrderService')

module.exports.createDispatchOrder = async (req,res) =>{
    let response = {...constants.defaultServerResponse}

    try{
        const responseFromService = await dispatchOrderService.createDispatchOrder(req.body);
        response.status = 200;
        response.message = constants.dispatchOrder.DISPATCH_ORDER_CREATED;
        response.body = responseFromService;

    }catch(error){
        console.log('Something went wrong: Controller: createDispatchOrder');
        response.message = error.message;
        response.message = error.message
    }
    return res.status(response.status).send(response)
}

module.exports.getAllDispatchOrders = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await dispatchOrderService.getAllDispatchOrders(req.query);
        response.status = 200;
        response.message = constants.dispatchOrder.DISPATCH_ORDER_FETCHED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: getAllDispatchOrders');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.getDispatchOrderById = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await dispatchOrderService.getDispatchOrderById(req.params);
        response.status = 200;
        response.message = constants.dispatchOrder.DISPATCH_ORDER_FETCHED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: getDispatchOrderById');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.updateDispatchOrder = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await dispatchOrderService.updateDispatchOrder({
            id: req.params.id,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = constants.dispatchOrder.DISPATCH_ORDER_UPDATED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: updateDispatchOrder');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.deleteDispatchOrder = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await dispatchOrderService.deleteDispatchOrder(req.params);
        response.status = 200;
        response.message = constants.dispatchOrder.DISPATCH_ORDER_DELETED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: deleteDispatchOrder');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}