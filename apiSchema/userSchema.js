const Joi = require('@hapi/joi')

module.exports.createUserSchema = Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    contact: Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().required()
})

module.exports.loginUserSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})