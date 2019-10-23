const Joi = require('@hapi/joi')

module.exports.createUserSchema = Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    contact: Joi.string().regex(/^[0-9]{10}$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().required()
})

module.exports.loginUserSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

module.exports.getAllUserSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string()
});

module.exports.updateUserSchema = Joi.object().keys({
    name: Joi.string(),
    address: Joi.string(),
    contact: Joi.string().regex(/^[0-9]{10}$/),
    email: Joi.string().email(),
    password: Joi.string(),
    role: Joi.string()
});