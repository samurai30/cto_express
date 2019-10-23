const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const joiValidation = require('../middleware/joiSchemaValidation')
const userSchema = require('../apiSchema/userSchema')
const tokenValidate = require('../middleware/tokenValidation')
const checRoles = require('../middleware/checkRoles')

router.post('/add_users',tokenValidate.validateToken,checRoles.hasAccess('super_admin'),joiValidation.validateBody(userSchema.createUserSchema),userController.registerUser)
router.post('/login',joiValidation.validateBody(userSchema.loginUserSchema),userController.login)


module.exports = router;
