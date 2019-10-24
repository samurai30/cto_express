const express = require('express')
const router = express.Router()
const storeSchema = require('../apiSchema/storeSchema');
const joiValidation = require('../middleware/joiSchemaValidation');
const storeController = require('../controller/storeController')
const tokenValidate = require('../middleware/tokenValidation')
const checRoles = require('../middleware/checkRoles')


router.post('/',joiValidation.validateBody(storeSchema.createStoreSchema),tokenValidate.validateToken,checRoles.hasAccess('super_admin'),storeController.createStore)
router.get('/:id',tokenValidate.validateToken,checRoles.hasAccess('super_admin'),storeController.getStoreById)
router.get('/',tokenValidate.validateToken,checRoles.hasAccess('super_admin'),storeController.getAllStores)


module.exports = router;