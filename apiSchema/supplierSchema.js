const Joi = require('@hapi/joi')

module.exports.createSupplierSchema = Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    contact: Joi.number().required(),
    gstin: Joi.string().required()
})