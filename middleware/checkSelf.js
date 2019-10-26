const User = require('../database/models/userModel')
const constants = require('../constants')
module.exports.hasAccess = () =>{
    return async (req,res,next) =>{
        let response = constants.defaultServerResponse;
        if (req.session.user) {
            try{
            
                if(req.session.user === req.params.id){
                    console.log( req.params.id)
                    return next()
                }  
                response.message = `sorry you don't have access to this.`;

                return res.status(401).send(response)
            
            }catch(error){
                console.log('something went wrong: middleware: HasAccess')
                response.message = error.message;
                return res.status(400).send(response)
            }       
          }

    }
}