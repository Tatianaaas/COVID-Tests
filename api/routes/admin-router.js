const express = require('express')

const authorize = require('../middleware/authorize')
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
adminRouter.put("/update/:userId", userController.updateUser);
//Editar password do administrador
adminRouter.put('/updatepass/:userId', adminController.updateAdminPassword);
//Ver um determinado utilizador pelo ID
adminRouter.get('/show/:userId', userController.getUserById);
//Criar novos técnicos
adminRouter.post('/signuptechnics', adminController.createTechnics);
//Eliminar utilizadores
adminRouter.delete("/delete/:userId", authorize, adminController.deleteUser);
//Obter numero de testes por dia , por pessoa e infetados
adminRouter.post("/tests/day", testController.getTestsByDay);
adminRouter.get("/tests/:username", testController.getTestsByPerson);
adminRouter.post("/tests/infected", testController.getinfetados);
//Obter todos os testes realizados
adminRouter.get("/tests", testController.getOrders);

module.exports = adminRouter