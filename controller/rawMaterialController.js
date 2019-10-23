const rawService = require('../service/rawMaterialService')
const constants = require('../constants')

module.exports.createRawMaterial = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await rawService.createRawMaterial(req.body);
        response.status = 200;
        response.message = constants.rawMaterial.RAW_MATERIAL_CREATED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: createRawMaterial');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.getAllRawMaterials = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await rawService.getAllRawMaterials(req.query);
        response.status = 200;
        response.message = constants.rawMaterial.RAW_MATERIAL_CREATED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: createRawMaterial');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.getRawMaterialById = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await rawService.getRawMaterialById(req.params);
        response.status = 200;
        response.message = "success"
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: createRawMaterial');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}
module.exports.updateRawMaterial = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await rawService.updateRawMaterial({id:req.params.id,updateInfo:req.body});
        response.status = 200;
        response.message = "success"
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: updateRawMaterial');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}