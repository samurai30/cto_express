const constants = require('../constants')
const userService = require('../service/userService')


module.exports.registerUser = async (req,res) =>{
    let response = {...constants.defaultServerResponse}

    try{
        const responseFromService = await userService.registerUser(req.body);
        response.status = 200;
        response.message = constants.userMessage.SIGNUP_SUCCESS;
        response.body = responseFromService;

    }catch(error){
        console.log('Something went wrong: Controller: signup');
        throw new Error(error)
    }
    return res.status(response.status).send(response)
}