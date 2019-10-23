const constants = require('../constants')
const categoryService = require('../service/categoryService')

module.exports.createCategory = async (req,res) =>{
    let response = {...constants.defaultServerResponse}

    try{
        const responseFromService = await categoryService.createCategory(req.body);
        response.status = 200;
        response.message = constants.category.CATEGORY_CREATED;
        response.body = responseFromService;

    }catch(error){
        console.log('Something went wrong: Controller: createCategory');
        response.message = error.message
    }
    return res.status(response.status).send(response)
}

module.exports.getAllCategories = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await categoryService.getAllCategories(req.query);
        response.status = 200;
        response.message = constants.category.CATEGORY_FETCHED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: getAllCategories');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.getCategoryById = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await categoryService.getCategoryById(req.params);
        response.status = 200;
        response.message = constants.category.CATEGORY_FETCHED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: getCategoryById');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.updateCategory = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await categoryService.updateCategory({
            id: req.params.id,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = constants.category.CATEGORY_UPDATED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: updateCategory');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}

module.exports.deleteCategory = async (req,res) => {
    let response = {...constants.defaultServerResponse};

    try{
        const responseFromService = await categoryService.deleteCategory(req.params);
        response.status = 200;
        response.message = constants.category.CATEGORY_DELETED;
        response.body = responseFromService;
    }catch(error){
        console.log('Something went wrong: Controller: deleteCategory');
        response.message = error.message    
    }

    return res.status(response.status).send(response)
}