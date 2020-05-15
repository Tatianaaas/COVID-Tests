const express = require('express')

const authorize = require('../middleware/authorizeTech')
const session = require('../middleware/session')
const userController = require('../controllers/userController')
const testController = require("../controllers/testController")

const technicRouter = express.Router()

//Editar
technicRouter.put("/update/:userId", session, authorize, userController.updateUser);

//Logout
technicRouter.post("/logout", session, authorize, userController.logout)

//Registo resultado do primeiro teste
technicRouter.put("/results/firstTest/:userId", session, authorize, testController.updateFirstResult);

//Registo resultado do segundo teste
technicRouter.put("/results/secondTest/:userId", session, authorize, testController.updateSecondResult);

//Agendar primeiro teste
technicRouter.put("/scheduleTest/first/:userId", session, authorize, testController.scheduleFirstTest);

module.exports = technicRouter