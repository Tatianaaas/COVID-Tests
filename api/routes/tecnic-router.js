const express = require('express')

const authorize = require('../middleware/authorize')
const session = require('../middleware/session')

const testController = require("../controllers/testController")
const userController = require('../controllers/userController')

const technicRouter = express.Router()

//Login
technicRouter.post('/login', userController.loginUser);

//Editar
technicRouter.put("/update/:userId", session, userController.updateUser);

//Logout
technicRouter.post("/logout", session, userController.logout)

//Registo resultado do primeiro teste
technicRouter.put("/results/firstTest/:userId", session, testController.updateFirstResult);

//Registo resultado do segundo teste
technicRouter.put("/results/secondTest/:userId", session, testController.updateSecondResult);

//Agendar primeiro teste
technicRouter.put("/scheduleTest/first/:userId", session, testController.scheduleFirstTest);

//Agendar segundo teste 
technicRouter.put("/scheduleTest/second/:userId", session, testController.scheduleSecondTest);

module.exports = technicRouter