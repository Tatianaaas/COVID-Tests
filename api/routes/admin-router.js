const express = require('express')

const authorize = require('../middleware/authorizeAdmin')
const session = require('../middleware/session')

const testController = require("../controllers/testController")
const userController = require('../controllers/userController')
const adminController = require('../controllers/adminController')

const adminRouter = express.Router()

//Sign up (administração)
adminRouter.post('/signup', adminController.createAdmin);

//Login
adminRouter.post('/login', userController.loginUser);

//Editar utilizador
adminRouter.put("/update/:userId", session, authorize(['ADMIN']), userController.updateUser);

//Editar password do administrador
adminRouter.put('/updatepass/:userId', session, authorize(['ADMIN']), adminController.updateAdminPassword);

//Ver um determinado utilizador pelo ID
adminRouter.get('/show/:userId', userController.getUserById);

//Criar novos técnicos
adminRouter.post('/signuptechnics', session, authorize(['ADMIN']), adminController.createTechnics);

//Eliminar utilizadores
adminRouter.delete("/delete/:userId", session, authorize(['ADMIN']), adminController.deleteUser);

//Logout
adminRouter.post("/logout", session, authorize(['ADMIN']), userController.logout)

//Obter numero de testes por dia , por pessoa e infetados
adminRouter.post("/tests/day", session, authorize(['ADMIN']), testController.getTestsByDay);

//Obter numero de testes por pessoa
adminRouter.get("/tests/:username", testController.getTestsByPerson);

//Obter numero total de infetados
adminRouter.post("/tests/infected", session, authorize(['ADMIN']), testController.getinfetados);

//Obter todos os testes realizados
adminRouter.get("/tests", testController.getOrders);

module.exports = adminRouter