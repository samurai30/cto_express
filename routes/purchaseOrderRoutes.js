const express = require('express')
const router = express.Router()
const purchaseOrderSchema = require('../apiSchema/purchaseOrderSchema');
const joiValidation = require('../middleware/joiSchemaValidation');
const purchaseOrderController = require('../controller/purchaseOrderController')
const tokenValidate = require('../middleware/tokenValidation')
const checRoles = require('../middleware/checkRoles')

router.post('/',joiValidation.validateBody(purchaseOrderSchema.createPurchaseOrderSchema),tokenValidate.validateToken,checRoles.hasAccess('super_admin'),purchaseOrderController.createPurchaseOrder);

router.get('/:id',tokenValidate.validateToken,checRoles.hasAccess(['super_admin']),purchaseOrderController.getPurchaseOrderById);

router.get('/',joiValidation.validateQueryData(purchaseOrderSchema.getAllPurchaseOrderSchema)
,tokenValidate.validateToken,checRoles.hasAccess(['super_admin']),purchaseOrderController.getAllPurchaseOrders);

router.put('/:id',joiValidation.validateBody(purchaseOrderSchema.updatePurchaseOrderSchema),tokenValidate.validateToken,checRoles.hasAccess('super_admin'),purchaseOrderController.updatePurchaseOrder);

router.delete('/:id',tokenValidate.validateToken,checRoles.hasAccess('super_admin'),purchaseOrderController.deletePurchaseOrder);

module.exports = router;
