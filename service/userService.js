const Users = require('../database/models/userModel');
const {formatMongoData, checkObjectId} = require('../helpers/dbHelper');
const constants = require('../constants')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

 
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

 module.exports.login = async ({email,password}) =>{
    try{
        let user = await Users.findOne({email: email})
        if(!user){
            throw new Error(constants.userMessage.USER_NOT_FOUND)
        }

        const isValid = await bcrypt.compare(password,user.password)
        
        if(!isValid){
            throw new Error(constants.userMessage.INVALID_PASSWORD)
        }

        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY || '@!#!@SADD!@asdaskj@$',{expiresIn: "1d"})
        
        return {token: token}

    }catch(error){
        console.log('Something went wrong: Service: login', error)
        throw new Error(error);
    }
}
