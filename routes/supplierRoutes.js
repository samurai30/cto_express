const express = require('express')
const router = express.Router()
const supplierSchema = require('../apiSchema/supplierSchema');
const joiValidation = require('../middleware/joiSchemaValidation');
const supplierController = require('../controller/supplierController')

router.post('/',joiValidation.validateBody(supplierSchema.createSupplierSchema),supplierController.createSupplier);

router.get('/:id',supplierController.getSupplierById);

router.get('/',joiValidation.validateQueryData(supplierSchema.getAllSupplierSchema)
,supplierController.getAllSuppliers);

router.put('/:id',joiValidation.validateBody(supplierSchema.updateSupplierSchema),supplierController.updateSupplier);

module.exports = router;
