const Joi = require('@hapi/joi')

module.exports.createRestaurantSchema = Joi.object().keys({
    name: Joi.string().required(),
    owner_name: Joi.string().required(),
    owner_contact: Joi.string().regex(/^[0-9]{10}$/).required()
})

module.exports.getAllRestaurantSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string()
});

module.exports.updateRestaurantSchema = Joi.object().keys({
    name: Joi.string(),
    owner_name: Joi.string(),
    owner_contact: Joi.string()
});