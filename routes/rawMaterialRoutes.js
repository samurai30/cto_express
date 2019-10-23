const express = require('express');
const router = express.Router();
const rawController = require('../controller/rawMaterialController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const rawMaterialSchema = require('../apiSchema/rawMaterialSchema');
const tokenValidation = require('../middleware/tokenValidation')
router.post('/',
joiSchemaValidation.validateBody(rawMaterialSchema.createRawMaterialSchema),
rawController.createRawMaterial)

router.get('/:id',rawController.getRawMaterialById)

router.get('/',tokenValidation.validateToken,
joiSchemaValidation.validateQueryData(rawMaterialSchema.getAllRawMaterialSchema)
,rawController.getAllRawMaterials)

router.put('/:id',joiSchemaValidation.validateBody(rawMaterialSchema.updateRawMaterialSchema),rawController.updateRawMaterial)

router.delete('/:id',rawController.deleteRawMaterial)

module.exports = router