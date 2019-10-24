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
        let phone = await Users.findOne({contact: userData.contact})
        if(phone){
            throw new Error("contact number already exits")
        }
        userData.password =  await bcrypt.hash(userData.password, 12);
        const newUser = new Users({...userData});
        let result = await newUser.save();

        return formatMongoData(result);
    }catch(error){
        console.log('Something went wrong: Service: registerUser', error);
        throw new Error(error);
    }
}

 module.exports.login = async ({email,password}) =>{
    try{
        let user = await Users.findOne({email: email});
        if(!user){
            throw new Error(constants.userMessage.USER_NOT_FOUND)
        }

        const isValid = await bcrypt.compare(password,user.password);
        
        if(!isValid){
            throw new Error(constants.userMessage.INVALID_PASSWORD)
        }

        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY || '@!#!@SADD!@asdaskj@$',{expiresIn: "1d"});
        
        return {token: token, id: user._id}

    }catch(error){
        console.log('Something went wrong: Service: login', error);
        throw new Error(error);
    }
};

module.exports.getAllUsers = async ({skip=0, limit=10}) =>{
    try{
   
     let user = await Users.find({}).skip(parseInt(skip)).limit(parseInt(limit));
     return formatMongoData(user);
    }catch(error){
      console.log('Something went wrong: Service: getAllProducts', error);
      throw new Error(error)
    }
  };
  
  module.exports.getUserById = async ({id}) =>{
    try{
     checkObjectId(id);
     let user = await Users.findById(id);
     if(!user){
       throw new Error("User not found") 
     }
     return formatMongoData(user);
    }catch(error){
      console.log('Something went wrong: Service: getRawMaterialById', error);
      throw new Error(error)
    }
  };
  
  module.exports.updateUsers = async ({id, updateInfo}) =>{
    try{
     checkObjectId(id);
     let user = await Users.findOneAndUpdate({_id:id},updateInfo,{ new : true});
     console.log(user)
     if(!user){
       throw new Error("User not found") 
     }
     return formatMongoData(user);
    }catch(error){
      console.log('Something went wrong: Service: updateRawMaterial', error);
      throw new Error(error)
    }
  };
  
  module.exports.deleteUser = async ({id}) =>{
    try{
     checkObjectId(id);
     let user = await Users.findByIdAndDelete(id);
     
     if(!user){
       throw new Error("Sorry user not found") 
     }
     return formatMongoData(user);
    }catch(error){
      console.log('Something went wrong: Service: deleteUser', error);
      throw new Error(error)
    }
  };


module.exports.getUserRole = async ({id}) =>{
    try{
        checkObjectId(id);
        let user = await Users.findById(id);
        if(!user){
            throw new Error("Sorry user not found")
        }
        return {user_role:user.role};
    }catch(error){
        console.log('Something went wrong: Service: getUserRole', error);
        throw new Error(error)
    }
};