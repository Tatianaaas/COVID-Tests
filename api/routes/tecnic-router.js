const express = require('express')

const userController = require('../controllers/userController')
const technicRouter = express.Router()

//Login
technicRouter.post('/login', userController.loginUser);
//Editar
technicRouter.put("/update/:userId", userController.updateUser);

module.exports = technicRouter