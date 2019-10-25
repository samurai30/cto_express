const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const joiValidation = require('../middleware/joiSchemaValidation');
const userSchema = require('../apiSchema/userSchema');
const tokenValidate = require('../middleware/tokenValidation');
const checRoles = require('../middleware/checkRoles');

router.post('/add_users',joiValidation.validateBody(userSchema.createUserSchema),tokenValidate.validateToken,checRoles.hasAccess('super_admin'),userController.registerUser);
router.post('/login',joiValidation.validateBody(userSchema.loginUserSchema),userController.login);
router.get('/role/:id',tokenValidate.validateToken,userController.getUserRole);
router.get('/:id',tokenValidate.validateToken,checRoles.hasAccess('super_admin'),userController.getUserById);
router.get('/',joiValidation.validateQueryData(userSchema.getAllUserSchema),tokenValidate.validateToken,checRoles.hasAccess('super_admin'),userController.getAllUsers);
router.put('/:id',joiValidation.validateBody(userSchema.updateUserSchema),tokenValidate.validateToken,checRoles.hasAccess('super_admin'),userController.updateUsers);
router.delete('/:id',tokenValidate.validateToken,checRoles.hasAccess('super_admin'),userController.deleteUser);

module.exports = router;
