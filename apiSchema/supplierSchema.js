const Joi = require('@hapi/joi')

module.exports.createSupplierSchema = Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    contact: Joi.string().regex(/^[0-9]{10}$/).required(),
    gstin: Joi.string().alphanum().required(),
    raw_ids:Joi.array().required()
})

module.exports.getAllSupplierSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string()
});

module.exports.updateSupplierSchema = Joi.object().keys({
    name: Joi.string(),
    address: Joi.string(),
    contact: Joi.number(),
    gstin: Joi.string().alphanum()
});