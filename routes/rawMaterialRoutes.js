const express = require('express');
const router = express.Router();
const rawController = require('../controller/rawMaterialController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const rawMaterialSchema = require('../apiSchema/rawMaterialSchema');
const tokenValidation = require('../middleware/tokenValidation')
const checRoles = require('../middleware/checkRoles')



router.post('/',
joiSchemaValidation.validateBody(rawMaterialSchema.createRawMaterialSchema),tokenValidation.validateToken,checRoles.hasAccess(['restaurant_admin','store_manager']),
rawController.createRawMaterial)


router.get('/all/:restaurant_id',tokenValidation.validateToken,
joiSchemaValidation.validateQueryData(rawMaterialSchema.getAllRawMaterialSchema)
,checRoles.hasAccess(['restaurant_admin','store_manager','outlet_manager']),rawController.getAllRawMaterials)

router.get('/:id',tokenValidation.validateToken,checRoles.hasAccess(['restaurant_admin','store_manager','outlet_manager']),rawController.getRawMaterialById)

router.put('/:id',joiSchemaValidation.validateBody(rawMaterialSchema.updateRawMaterialSchema),tokenValidation.validateToken,checRoles.hasAccess('super_admin'),rawController.updateRawMaterial)

router.delete('/:id',tokenValidation.validateToken,checRoles.hasAccess('super_admin'),rawController.deleteRawMaterial)

module.exports = router