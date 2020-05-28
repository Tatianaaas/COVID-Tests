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

//Logout
userRouter.post("/logout", session, authorize, userController.logout)

//Efeuar pedido de teste
userRouter.put("/ordertest/:userId", /*session, authorize,*/ testController.createOrder);

module.exports = userRouter