const express = require('express')
const router = express.Router()
const outletSchema = require('../apiSchema/outletSchema');
const joiValidation = require('../middleware/joiSchemaValidation');
const outletController = require('../controller/outletController')
const tokenValidate = require('../middleware/tokenValidation')
const checRoles = require('../middleware/checkRoles')

router.post('/',joiValidation.validateBody(outletSchema.createOutletSchema),tokenValidate.validateToken,checRoles.hasAccess('super_admin'),outletController.createOutlet);

router.get('/:id',tokenValidate.validateToken,checRoles.hasAccess(['super_admin']),outletController.getOutletById);

router.get('/',joiValidation.validateQueryData(outletSchema.getAllOutletSchema)
,tokenValidate.validateToken,checRoles.hasAccess(['super_admin']),outletController.getAllOutlets);

router.put('/:id',joiValidation.validateBody(outletSchema.updateOutletSchema),tokenValidate.validateToken,checRoles.hasAccess('super_admin'),outletController.updateOutlet);

router.delete('/:id',tokenValidate.validateToken,checRoles.hasAccess('super_admin'),outletController.deleteOutlet);

module.exports = router;
