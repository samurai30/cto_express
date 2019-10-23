const express = require('express')
const router = express.Router()
const restaurantSchema = require('../apiSchema/restaurantSchema');
const joiValidation = require('../middleware/joiSchemaValidation');
const restaurantController = require('../controller/restaurantController');
const tokenValidate = require('../middleware/tokenValidation')
const checRoles = require('../middleware/checkRoles')

router.post('/',joiValidation.validateBody(restaurantSchema.createRestaurantSchema),tokenValidate.validateToken,checRoles.hasAccess('super_admin'),restaurantController.createRestaurant);

router.get('/:id',tokenValidate.validateToken,checRoles.hasAccess(['store_manager','outlet_manager']),restaurantController.getRestaurantById);

router.get('/',tokenValidate.validateToken,checRoles.hasAccess(['store_manager','outlet_manager']),joiValidation.validateQueryData(restaurantSchema.getAllRestaurantSchema),restaurantController.getAllRestaurants);

router.put('/:id',joiValidation.validateBody(restaurantSchema.updateRestaurantSchema),tokenValidate.validateToken,checRoles.hasAccess('super_admin'),restaurantController.updateRestaurant);

router.delete('/:id',tokenValidate.validateToken,checRoles.hasAccess('super_admin'),restaurantController.deleteRestaurant);

module.exports = router;