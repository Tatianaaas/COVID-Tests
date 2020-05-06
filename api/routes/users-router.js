const express = require('express')

const userController = require('../controllers/userController')
const userRouter = express.Router()

userRouter.post('/signup', userController.createUser);
userRouter.post('/login', userController.loginUser);

//vou colocar aqui as rotas que sao responsaveis pelo criar, editar, atualizar e remover utlizidador
//como o create ja esta a ser utilizado no signup , penso que nao preciso de colocar outra vez
userRouter.get("/show/:userId", userController.getUserById);
userRouter.put("/update/:userId", userController.updateUser);
userRouter.delete("/delete/:userId", userController.deleteUser);

module.exports = userRouter