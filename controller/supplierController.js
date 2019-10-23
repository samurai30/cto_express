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
        throw new Error(error)
    }
    return res.status(response.status).send(response)
}