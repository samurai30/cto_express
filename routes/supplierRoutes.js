const express = require('express')
const router = express.Router()
const supplierSchema = require('../apiSchema/supplierSchema');
const joiValidation = require('../middleware/joiSchemaValidation');
const supplierController = require('../controller/supplierController')
const tokenValidate = require('../middleware/tokenValidation')
const checRoles = require('../middleware/checkRoles')

router.post('/',joiValidation.validateBody(supplierSchema.createSupplierSchema),tokenValidate.validateToken,checRoles.hasAccess('super_admin'),supplierController.createSupplier);

router.get('/:id',tokenValidate.validateToken,checRoles.hasAccess('store_manager'),supplierController.getSupplierById);

router.get('/',joiValidation.validateQueryData(supplierSchema.getAllSupplierSchema)
,tokenValidate.validateToken,checRoles.hasAccess('store_manager'),supplierController.getAllSuppliers);

router.put('/:id',joiValidation.validateBody(supplierSchema.updateSupplierSchema),tokenValidate.validateToken,checRoles.hasAccess('store_manager'),supplierController.updateSupplier);

router.delete('/:id',tokenValidate.validateToken,checRoles.hasAccess('super_admin'),supplierController.deleteSupplier);

module.exports = router;
