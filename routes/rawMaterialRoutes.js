const express = require('express');
const router = express.Router();
const rawController = require('../controller/rawMaterialController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const rawMaterialSchema = require('../apiSchema/rawMaterialSchema');

router.post('/',
joiSchemaValidation.validateBody(rawMaterialSchema.createRawMaterialSchema),
rawController.createRawMaterial)

router.get('/:id',rawController.getRawMaterialById)

router.get('/',
joiSchemaValidation.validateQueryData(rawMaterialSchema.getAllRawMaterialSchema)
,rawController.getAllRawMaterials)



module.exports = router