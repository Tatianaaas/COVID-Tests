const express = require('express')

const authorize = require('../middleware/authorizeUtente')
const session = require('../middleware/session')

const testController = require('../controllers/testController')
const userController = require('../controllers/userController')

const userRouter = express.Router()

//Ver um determinado utilizador pelo ID
userRouter.get("/show/:userId", userController.getUserById);

//Editar utilizador
userRouter.put("/update/:userId", session, authorize, userController.updateUser);

//Efeuar pedido de teste
userRouter.put("/ordertest/:userId", /*session, authorize,*/ testController.createOrder);

//Consultar informações sobre o próprio teste
userRouter.get("/test/:userId", testController.getOrderById);

module.exports = userRouter