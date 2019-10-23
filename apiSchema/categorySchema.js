const Joi = require('@hapi/joi')

module.exports.createCategorySchema = Joi.object().keys({
    name: Joi.string().required()
})

module.exports.getAllCategoriesSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string()
});

module.exports.updateCategorySchema = Joi.object().keys({
    name: Joi.string()
});