const Users = require('../database/models/userModel');
const {formatMongoData, checkObjectId} = require('../helpers/dbHelper');
const constants = require('../constants')
const bcrypt = require('bcrypt')

module.exports.registerUser = async (userData) =>{
    try{
        let user = await Users.findOne({email: userData.email})
        if(user){
            throw new Error(constants.userMessage.USER_EXISTS)
        }

        userData.password =  await bcrypt.hash(userData.password, 12)
        
        const newUser = new Users({...userData})
        let result = await newUser.save();

        return formatMongoData(result);

    }catch(error){
        console.log('Something went wrong: Service: registerUser', error)
        throw new Error(error);
    }
}

 