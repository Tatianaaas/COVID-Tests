const express = require('express')

const userController = require('../controllers/userController')
const userRouter = express.Router()

//Código em falta
userRouter.post('/signup', userController.createUser);

userRouter.post('/login', userController.loginUSer);

module.exports = userRouter