const express = require('express')
const router = express.Router()
const dispatchOrderSchema = require('../apiSchema/dispatchOrderSchema');
const joiValidation = require('../middleware/joiSchemaValidation');
const dispatchOrderController = require('../controller/dispatchOrderController')
const tokenValidate = require('../middleware/tokenValidation')
const checRoles = require('../middleware/checkRoles')

router.post('/',joiValidation.validateBody(dispatchOrderSchema.createDispatchOrderSchema),tokenValidate.validateToken,checRoles.hasAccess('super_admin'),dispatchOrderController.createDispatchOrder);

router.get('/:id',tokenValidate.validateToken,checRoles.hasAccess(['super_admin']),dispatchOrderController.getDispatchOrderById);

router.get('/',joiValidation.validateQueryData(dispatchOrderSchema.getAllDispatchOrderSchema)
,tokenValidate.validateToken,checRoles.hasAccess(['super_admin']),dispatchOrderController.getAllDispatchOrders);

router.put('/:id',joiValidation.validateBody(dispatchOrderSchema.updateDispatchOrderSchema),tokenValidate.validateToken,checRoles.hasAccess('super_admin'),dispatchOrderController.updateDispatchOrder);

router.delete('/:id',tokenValidate.validateToken,checRoles.hasAccess('super_admin'),dispatchOrderController.deleteDispatchOrder);

module.exports = router;
