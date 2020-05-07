const express = require('express')
const jwt = require('jsonwebtoken')

const userController = require('../controllers/userController')
const userRouter = express.Router()

//Sign up (utente)
userRouter.post('/signup', userController.createUser);
userRouter.post('/signup', userController.createUser);

//Login
//userRouter.get('/login',userController.getLog)
userRouter.post('/login', userController.loginUser);

//vou colocar aqui as rotas que sao responsaveis pelo criar, editar, atualizar e remover utlizidador
//como o create ja esta a ser utilizado no signup , penso que nao preciso de colocar outra vez
//Ver um determinado utilizador pelo ID
userRouter.get("/show/:userId", /*verifyJWT,*/ userController.getUserById);
//Editar utilizador
userRouter.put("/update/:userId", /*verifyJWT,*/ userController.updateUser);

module.exports = userRouter