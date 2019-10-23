const Joi = require('@hapi/joi');

module.exports.createRawMaterialSchema = Joi.object().keys({
    name: Joi.string().required(),
    unit_id: Joi.string().required(),
    cat_id: Joi.string().required()
})

module.exports.getAllRawMaterialSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string()
});

module.exports.updateRawMaterialSchema = Joi.object().keys({
    name: Joi.string().required(),
    unit_id: Joi.string().required(),
    cat_id: Joi.string().required()
});
