const express = require('express')

const userController = require('../controllers/userController')
const userRouter = express.Router()

//Código em falta
/*
userRouter.get('/', (req, res, next) => {
    res.send({
        status: 'ok'
    })
})*/

userRouter.post('/signup', userController.createUser);

userRouter.post('/login', userController.loginUser);

module.exports = userRouter