const Units = require('../database/models/UnitsModel');
const {formatMongoData, checkObjectId} = require('../helpers/dbHelper');
const constants = require('../constants')

 
module.exports.createUnit = async (unitData) =>{
    try{
        let unit = await Units.findOne({designation: unitData.designation.toLowerCase()})
        if(unit){
            throw new Error(constants.unitMessage.UNIT_EXISTS)
        }
        unitData.designation = unitData.designation.toLowerCase();
        const newUnit = new Units({...unitData})
        let result = await newUnit.save();
        
        return formatMongoData(result);
    }catch(error){
        console.log('Something went wrong: Service: createUnit', error)
        throw new Error(error);
    }
}

module.exports.getAllUnit = async ({skip=0, limit=10}) =>{
    try{
        let unit = await Units.find({}).skip(parseInt(skip)).limit(parseInt(limit));
        return formatMongoData(unit);
    }catch(error){
        console.log('Something went wrong: Service: getAllUnit', error)
        throw new Error(error);
    }
}

module.exports.deleteUnits = async ({id}) =>{
    try{
        checkObjectId(id);
        let unit = await Units.findByIdAndDelete(id);
    
        if(!unit){
            throw new Error(constant.unitMessage.UNIT_NOT_FOUND) 
        }
        return formatMongoData(unit);
    }catch(error){
        console.log('Something went wrong: Service: deleteUnits', error)
        throw new Error(error)
    }
}