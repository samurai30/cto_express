const express = require('express')
const router = express.Router()
const categorySchema = require('../apiSchema/categorySchema');
const joiValidation = require('../middleware/joiSchemaValidation');
const categoryController = require('../controller/categoryController');

router.post('/',joiValidation.validateBody(categorySchema.createCategorySchema),categoryController.createCategory);

router.get('/:id',categoryController.getCategoryById);

router.get('/',joiValidation.validateQueryData(categorySchema.getAllCategoriesSchema)
,categoryController.getAllCategories);

router.put('/:id',joiValidation.validateBody(categorySchema.updateCategorySchema),categoryController.updateCategory);

router.delete('/:id',categoryController.deleteCategory);

module.exports = router;