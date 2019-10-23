const express = requires('express')
const router = express.Router()
const supplierSchema = require('../apiSchema/supplierSchema');
const joiValidation = require('../middleware/joiSchemaValidation');


router.post('/',joiValidation.validateBody(supplierSchema.createSupplierSchema),require('../controller/supplierController'))

module.exports = router;