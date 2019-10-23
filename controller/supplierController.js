const constants = require('../constants')
const supplierService = require('../service/supplierService')


module.exports.createSupplier = async (req,res) =>{
    let response = {...constants.defaultServerResponse}

    try{
        const responseFromService = await supplierService.createSupplier(req.body);
        response.status = 200;
        response.message = constants.supplier.SUPPLIER_CREATED;
        response.body = responseFromService;

    }catch(error){
        console.log('Something went wrong: Controller: createSupplier');
        response.message = error.message;
        response.message = error.message
    }
    return res.status(response.status).send(response)
}

module.exports.getAllSuppliers = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await supplierService.getAllSuppliers(req.query);
        response.status = 200;
        response.message = constants.supplier.SUPPLIER_FETCHED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: getAllSuppliers');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.getSupplierById = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await supplierService.getSupplierById(req.params);
        response.status = 200;
        response.message = constants.supplier.SUPPLIER_FETCHED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: getSupplierById');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.updateSupplier = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await supplierService.updateSupplier({
            id: req.params.id,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = constants.supplier.SUPPLIER_UPDATED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: updateSupplier');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.deleteSupplier = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await supplierService.deleteSupplier(req.params);
        response.status = 200;
        response.message = constants.supplier.SUPPLIER_DELETED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: deleteSupplier');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}