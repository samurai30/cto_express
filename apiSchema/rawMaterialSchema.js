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

module.exports.updateRawMaterialSchema = Joi.object().keys({
    name: Joi.string(),
    price: Joi.number(),
    supplier: Joi.string()
});
