const Joi = require('@hapi/joi')

module.exports.createOutletSchema = Joi.object().keys({
    city: Joi.string().required(),
    address: Joi.string().required(),
    contact: Joi.string().regex(/^[0-9]{10}$/).required(),
    restaurant_id:Joi.string().required(),
    manager_id: Joi.string().required(),
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
    restaurant_id:Joi.string(),
    manager_id: Joi.string(),
    raw_ids: Joi.array()
});