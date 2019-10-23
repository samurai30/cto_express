const Joi = require('@hapi/joi');

module.exports.createRawMaterialSchema = Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    supplier: Joi.string().required()
})

module.exports.getAllRawMaterialSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string()
});

<<<<<<< HEAD
module.exports.updateRawMaterialSchema = Joi.object().keys({
    name: Joi.string(),
    price: Joi.number(),
    supplier: Joi.string()
});
=======
>>>>>>> 8d6e2b949d9cd9d41641db6627b2b0187f9def62
