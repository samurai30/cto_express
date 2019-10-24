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
        console.log('Something went wrong: Controller: registerUser');
        response.message = error.message;
    }
    return res.status(response.status).send(response)
}


module.exports.login = async (req,res) =>{
    let response = {...constants.defaultServerResponse}

    try{
        const responseFromService = await userService.login(req.body);
        response.status = 200;
        response.message = constants.userMessage.LOGIN_SUCCESS;
        response.body = responseFromService;

    }catch(error){
        console.log('Something went wrong: Controller: login');
        response.message = error.message;
    }
    return res.status(response.status).send(response)
}

module.exports.getAllUsers = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await userService.getAllUsers(req.query);
        response.status = 200;
        response.message = "Users Fetched";
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: getAllUsers');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.getUserById = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await userService.getUserById(req.params);
        response.status = 200;
        response.message = "User Fetched"
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: getUserById');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}
module.exports.updateUsers = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
   
        const responseFromService = await userService.updateUsers({
            id: req.params.id,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = constants.rawMaterial.RAW_MATERIAL_UPDATED
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: updateUser');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.deleteUser = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await userService.deleteUser(req.params);
        response.status = 200;
        response.message = "User Deleted"
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: deleteUser');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
};

module.exports.getUserRole = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await userService.getUserRole(req.params);
        response.status = 200;
        response.message = "Success";
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: getUserRole');
        response.message = error.message
    }

    return res.status(response.status).send(response)
};
