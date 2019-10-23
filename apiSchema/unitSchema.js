const Joi = require('@hapi/joi');

module.exports.createUnitSchema = Joi.object().keys({
    designation:Joi.string().required(),
    primary_name: Joi.string().required(),
    secondary_name: Joi.string().required()
});

module.exports.getAllUnitSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string()
});