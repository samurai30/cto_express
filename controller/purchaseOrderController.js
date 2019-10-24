const constants = require('../constants')
const purchaseOrderService = require('../service/purchaseOrderService')

module.exports.createPurchaseOrder = async (req,res) =>{
    let response = {...constants.defaultServerResponse}

    try{
        const responseFromService = await purchaseOrderService.createPurchaseOrder(req.body);
        response.status = 200;
        response.message = constants.purchaseOrder.PURCHASE_ORDER_CREATED;
        response.body = responseFromService;

    }catch(error){
        console.log('Something went wrong: Controller: createPurchaseOrder');
        response.message = error.message;
        response.message = error.message
    }
    return res.status(response.status).send(response)
}

module.exports.getAllPurchaseOrders = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await purchaseOrderService.getAllPurchaseOrders(req.query);
        response.status = 200;
        response.message = constants.purchaseOrder.PURCHASE_ORDER_FETCHED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: getAllPurchaseOrders');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.getPurchaseOrderById = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await purchaseOrderService.getPurchaseOrderById(req.params);
        response.status = 200;
        response.message = constants.purchaseOrder.PURCHASE_ORDER_FETCHED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: getPurchaseOrderById');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.updatePurchaseOrder = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await purchaseOrderService.updatePurchaseOrder({
            id: req.params.id,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = constants.purchaseOrder.PURCHASE_ORDER_UPDATED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: updatePurchaseOrder');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.deletePurchaseOrder = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await purchaseOrderService.deletePurchaseOrder(req.params);
        response.status = 200;
        response.message = constants.purchaseOrder.PURCHASE_ORDER_DELETED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: deletePurchaseOrder');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}