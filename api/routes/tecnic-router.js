const express = require('express')
const testController= require("../controllers/testController")
const userController = require('../controllers/userController')
const technicRouter = express.Router()

//Login
technicRouter.post('/login', userController.loginUser);
//Editar
technicRouter.put("/update/:userId", userController.updateUser);
//Registo resultado do primeiro teste
technicRouter.put("/results/firstTest/:userId", testController.updateFirstResult);

//IMPORTANTE NAO ESQUECER 
//Fica a faltar o update dos resultados do segundo teste , aqui e nos controllers

//Agendar primeiro teste
technicRouter.put("/scheduleTest/first/:userId",testController.scheduleFirstTest);
//Agendar segundo teste 
technicRouter.put("/scheduleTest/second/:userId",testController.scheduleSecondTest);

module.exports = technicRouter