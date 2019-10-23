const express = require('express')
const router = express.Router()
const restaurantSchema = require('../apiSchema/restaurantSchema');
const joiValidation = require('../middleware/joiSchemaValidation');
const restaurantController = require('../controller/restaurantController');

router.post('/',joiValidation.validateBody(restaurantSchema.createRestaurantSchema),restaurantController.createRestaurant);

router.get('/:id',restaurantController.getRestaurantById);

router.get('/',joiValidation.validateQueryData(restaurantSchema.getAllRestaurantSchema),restaurantController.getAllRestaurants);

router.put('/:id',joiValidation.validateBody(restaurantSchema.updateRestaurantSchema),restaurantController.updateRestaurant);

router.delete('/:id',restaurantController.deleteRestaurant);

module.exports = router;