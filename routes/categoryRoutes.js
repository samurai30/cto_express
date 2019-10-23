const express = require('express')
const router = express.Router()
const categorySchema = require('../apiSchema/categorySchema');
const joiValidation = require('../middleware/joiSchemaValidation');
const categoryController = require('../controller/categoryController');
const tokenValidate = require('../middleware/tokenValidation')
const checRoles = require('../middleware/checkRoles')

router.post('/',joiValidation.validateBody(categorySchema.createCategorySchema),tokenValidate.validateToken,checRoles.hasAccess('super_admin'),categoryController.createCategory);

router.get('/:id',tokenValidate.validateToken,checRoles.hasAccess(['store_manager','outlet_manager']),categoryController.getCategoryById);

router.get('/',joiValidation.validateQueryData(categorySchema.getAllCategoriesSchema)
,tokenValidate.validateToken,checRoles.hasAccess(['store_manager','outlet_manager']),categoryController.getAllCategories);

router.put('/:id',joiValidation.validateBody(categorySchema.updateCategorySchema),tokenValidate.validateToken,checRoles.hasAccess('super_admin'),categoryController.updateCategory);

router.delete('/:id',tokenValidate.validateToken,checRoles.hasAccess('super_admin'),categoryController.deleteCategory);

module.exports = router;