const Joi = require('@hapi/joi')

module.exports.createPurchaseOrderSchema = Joi.object().keys({
    date: Joi.date().required(),
    total_amount: Joi.number().required(),
    gst: Joi.string().required(),
    grand_total: Joi.number().required(),
    invoice_no: Joi.string(),
    supplier_id:Joi.string().required(),
    store_id: Joi.string().required(),
    raw_ids: Joi.array().required()
});


module.exports.getAllPurchaseOrderSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string()
});


module.exports.updatePurchaseOrderSchema = Joi.object().keys({
    date: Joi.date(),
    total_amount: Joi.number(),
    gst: Joi.number(),
    grand_total: Joi.number(),
    invoice_no: Joi.string(),
    supplier_id:Joi.string(),
    store_id: Joi.string(),
    raw_ids: Joi.array()
});