const express = require('express')

const authorize = require('../middleware/authorize')
const session = require('../middleware/session')

const userController = require('../controllers/userController')
const adminController = require('../controllers/adminController')
const adminRouter = express.Router()

//Sign up (administração)
adminRouter.post('/signup', adminController.createAdmin);
//Login
adminRouter.post('/login', userController.loginUser);
//Editar utilizador
adminRouter.put("/update/:userId", userController.updateUser);
//Editar password do administrador
adminRouter.put('/updatepass/:userId', adminController.updateAdminPassword);
//Ver um determinado utilizador pelo ID
adminRouter.get('/show/:userId', userController.getUserById);
//Criar novos técnicos
adminRouter.post('/signuptechnics', adminController.createTechnics);
//Eliminar utilizadores
adminRouter.delete("/delete/:userId", session, adminController.deleteUser);

module.exports = adminRouter