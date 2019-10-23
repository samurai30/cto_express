const express = require('express');
const router = express.Router();
const rawController = require('../controller/rawMaterialController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const rawMaterialSchema = require('../apiSchema/rawMaterialSchema');
const tokenValidation = require('../middleware/tokenValidation')
const checRoles = require('../middleware/checkRoles')



router.post('/',
joiSchemaValidation.validateBody(rawMaterialSchema.createRawMaterialSchema),tokenValidation.validateToken,checRoles.hasAccess('super_admin'),
rawController.createRawMaterial)

router.get('/:id',tokenValidation.validateToken,rawController.getRawMaterialById)

router.get('/',tokenValidation.validateToken,
joiSchemaValidation.validateQueryData(rawMaterialSchema.getAllRawMaterialSchema)
,rawController.getAllRawMaterials)

router.put('/:id',joiSchemaValidation.validateBody(rawMaterialSchema.updateRawMaterialSchema),checRoles.hasAccess('super_admin'),rawController.updateRawMaterial)

router.delete('/:id',checRoles.hasAccess('super_admin'),rawController.deleteRawMaterial)

module.exports = router