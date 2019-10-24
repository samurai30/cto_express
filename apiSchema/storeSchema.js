const Joi = require('@hapi/joi')

module.exports.createStoreSchema = Joi.object().keys({
    address: Joi.string().required(),
    contact: Joi.string().regex(/^[0-9]{10}$/).required(),
    manager_id: Joi.string().required(),
    restaurant_id: Joi.string().required(),
    raw_ids: Joi.array().required(),
    outlet_ids: Joi.array().required()
})

module.exports.getAllStoreSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string()
});

module.exports.updateStoreSchema = Joi.object().keys({
    address: Joi.string(),
    contact: Joi.string().regex(/^[0-9]{10}$/),
    manager_id: Joi.string(),
    restaurant_id: Joi.string(),
    raw_ids: Joi.array(),
    outlet_ids: Joi.array()
});
