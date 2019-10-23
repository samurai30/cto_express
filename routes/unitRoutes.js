const express = require('express')
const router = express.Router()
const unitSchema = require('../apiSchema/unitSchema');
const joiValidation = require('../middleware/joiSchemaValidation');
const unitController = require('../controller/unitController')
const tokenValidate = require('../middleware/tokenValidation')
const checRoles = require('../middleware/checkRoles')


router.post('/',joiValidation.validateBody(unitSchema.createUnitSchema),tokenValidate.validateToken,checRoles.hasAccess('super_admin'),unitController.createUnit)
router.get('/',joiValidation.validateQueryData(unitSchema.getAllUnitSchema),tokenValidate.validateToken,checRoles.hasAccess(['store_manager','outlet_manager']),unitController.getAllUnit)
router.delete('/:id',tokenValidate.validateToken,checRoles.hasAccess('super_admin'),unitController.deleteUnits)

module.exports = router;