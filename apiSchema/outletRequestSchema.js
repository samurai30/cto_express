const Joi = require('@hapi/joi')

module.exports.createOutletRequestSchema = Joi.object().keys({
    date: Joi.date().required(),
    outlet_id:Joi.string().required(),
    store_id: Joi.string().required(),
    raw_ids: Joi.array().required()
})

module.exports.getAllOutletRequestSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string()
});

module.exports.updateOutletRequestSchema = Joi.object().keys({
    date: Joi.date(),
    outlet_id:Joi.string(),
    store_id: Joi.string(),
    raw_ids: Joi.array()
});