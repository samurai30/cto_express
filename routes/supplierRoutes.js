const express = require('express')
const router = express.Router()
const supplierSchema = require('../apiSchema/supplierSchema');
const joiValidation = require('../middleware/joiSchemaValidation');
const supplierController = require('../controller/supplierController')

router.post('/',joiValidation.validateBody(supplierSchema.createSupplierSchema),supplierController.createSupplier)

module.exports = router;