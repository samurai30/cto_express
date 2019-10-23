const Joi = require('@hapi/joi')

module.exports.createOutletSchema = Joi.object().keys({
    city: Joi.string().required(),
    address: Joi.string().required(),
    contact: Joi.string().regex(/^[0-9]{10}$/).required(),
    manager: Joi.string().required(),
    restaurant:Joi.string().required(),
    raw_ids: Joi.array().required()
})

module.exports.getAllOutletSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string()
});

module.exports.updateOutletSchema = Joi.object().keys({
    city: Joi.string(),
    address: Joi.string(),
    contact: Joi.string().regex(/^[0-9]{10}$/),
    manager: Joi.string(),
    restaurant:Joi.string(),
    raw_ids: Joi.array()
});