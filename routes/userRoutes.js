const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const joiValidation = require('../middleware/joiSchemaValidation')
const userSchema = require('../apiSchema/userSchema')


router.post('/add_users',joiValidation.validateBody(userSchema.createUserSchema),userController.registerUser)

module.exports = router;
