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
adminRouter.put("/update/:userId", session, userController.updateUser);

//Editar password do administrador
adminRouter.put('/updatepass/:userId', session, adminController.updateAdminPassword);

//Ver um determinado utilizador pelo ID
adminRouter.get('/show/:userId', userController.getUserById);

//Criar novos técnicos
adminRouter.post('/signuptechnics', session, adminController.createTechnics);

//Eliminar utilizadores
adminRouter.delete("/delete/:userId", session, /*authorize(['ADMIN'])*/ adminController.deleteUser);

//Logout
adminRouter.post("/logout", session, userController.logout)

//Obter numero de testes por dia , por pessoa e infetados
adminRouter.post("/tests/day", session, testController.getTestsByDay);

//Obter numero de testes por pessoa
adminRouter.get("/tests/:username", testController.getTestsByPerson);

//Obter numero total de infetados
adminRouter.post("/tests/infected", session, testController.getinfetados);

//Obter todos os testes realizados
adminRouter.get("/tests", testController.getOrders);

module.exports = adminRouter