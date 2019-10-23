const Joi = require('@hapi/joi')

module.exports.createUserSchema = Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    contact: Joi.number().integer().min(1000000000).max(9999999999).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})