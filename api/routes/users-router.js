const express = require('express')

const authorize = require('../middleware/authorizeUtente')
const session = require('../middleware/session')

const testController = require('../controllers/testController')
const userController = require('../controllers/userController')

const userRouter = express.Router()

//Sign up (utente)
userRouter.post('/signup', userController.createUser);

//Login
userRouter.post('/login', userController.loginUser);

//vou colocar aqui as rotas que sao responsaveis pelo criar, editar, atualizar e remover utlizidador
//como o create ja esta a ser utilizado no signup , penso que nao preciso de colocar outra vez
//Ver um determinado utilizador pelo ID
userRouter.get("/show/:userId", userController.getUserById);

//Editar utilizador
userRouter.put("/update/:userId", session, authorize, userController.updateUser);

//Logout
userRouter.post("/logout", session, authorize, userController.logout)

//Efeuar pedido de teste
userRouter.put("/ordertest/:userId", session, authorize, testController.createOrder);

module.exports = userRouter