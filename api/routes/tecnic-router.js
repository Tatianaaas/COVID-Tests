const express = require('express')
const testController = require("../controllers/testController")
const userController = require('../controllers/userController')
const technicRouter = express.Router()

//Login
technicRouter.post('/login', userController.loginUser);
//Editar
technicRouter.put("/update/:userId", userController.updateUser);

//Registo resultado do primeiro teste
technicRouter.put("/results/firstTest/:userId", testController.updateFirstResult);

//Registo resultado do segundo teste
technicRouter.put("/results/secondTest/:userId", testController.updateSecondResult);

//Agendar primeiro teste
technicRouter.put("/scheduleTest/first/:userId", testController.scheduleFirstTest);
//Agendar segundo teste 
technicRouter.put("/scheduleTest/second/:userId", testController.scheduleSecondTest);

module.exports = technicRouter