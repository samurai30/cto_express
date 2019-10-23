const constants = require('../constants')
const unitService = require('../service/unitService')


module.exports.createUnit = async (req,res) =>{
    let response = {...constants.defaultServerResponse}

    try{
        const responseFromService = await unitService.createUnit(req.body);
        response.status = 200;
        response.message = constants.unitMessage.UNIT_CREATED;
        response.body = responseFromService;

    }catch(error){
        console.log('Something went wrong: Controller: createUnit');
        response.message = error.message;
    }
    return res.status(response.status).send(response)
}

module.exports.getAllUnit = async (req,res) =>{
    let response = {...constants.defaultServerResponse}

    try{
        const responseFromService = await unitService.getAllUnit(req.query);
        response.status = 200;
        response.message = constants.unitMessage.UNIT_FETCHED;
        response.body = responseFromService;

    }catch(error){
        console.log('Something went wrong: Controller: getAllUnits');
        response.message = error.message;
    }
    return res.status(response.status).send(response)
}