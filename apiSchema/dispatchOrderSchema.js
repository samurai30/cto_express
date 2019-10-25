const Joi = require('@hapi/joi')

module.exports.createDispatchOrderSchema = Joi.object().keys({
    date: Joi.date().required(),
    total_amount: Joi.number().required(),
    gst: Joi.string().required(),
    grand_total: Joi.number().required(),
    invoice_no: Joi.string(),
    outlet_id:Joi.string().required(),
    store_id: Joi.string().required(),
    raw_ids: Joi.array().required()
})

module.exports.getAllDispatchOrderSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string()
});

module.exports.updateDispatchOrderSchema = Joi.object().keys({
    date: Joi.date(),
    total_amount: Joi.number(),
    gst: Joi.number(),
    grand_total: Joi.number(),
    invoice_no: Joi.string(),
    outlet_id:Joi.string(),
    store_id: Joi.string(),
    raw_ids: Joi.array()
});