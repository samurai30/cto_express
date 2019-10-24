const express = require('express')
const router = express.Router()
const outletRequestSchema = require('../apiSchema/outletRequestSchema');
const joiValidation = require('../middleware/joiSchemaValidation');
const outletRequestController = require('../controller/outletRequestController')
const tokenValidate = require('../middleware/tokenValidation')
const checRoles = require('../middleware/checkRoles')

router.post('/',joiValidation.validateBody(outletRequestSchema.createOutletRequestSchema),tokenValidate.validateToken,checRoles.hasAccess('super_admin'),outletRequestController.createOutletRequest);

router.get('/:id',tokenValidate.validateToken,checRoles.hasAccess(['super_admin']),outletRequestController.getOutletRequestById);

router.get('/',joiValidation.validateQueryData(outletRequestSchema.getAllOutletRequestSchema)
,tokenValidate.validateToken,checRoles.hasAccess(['super_admin']),outletRequestController.getAllOutletRequests);

router.put('/:id',joiValidation.validateBody(outletRequestSchema.updateOutletRequestSchema),tokenValidate.validateToken,checRoles.hasAccess('super_admin'),outletRequestController.updateOutletRequest);

router.delete('/:id',tokenValidate.validateToken,checRoles.hasAccess('super_admin'),outletRequestController.deleteOutletRequest);

module.exports = router;
