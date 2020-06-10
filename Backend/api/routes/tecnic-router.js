const express = require('express')

const authorize = require('../middleware/authorizeTech')
const session = require('../middleware/session')
const userController = require('../controllers/userController')
const testController = require("../controllers/testController")

const technicRouter = express.Router()

//Editar
technicRouter.put("/update/:userId", session, authorize, userController.updateUser);

//Registo resultado do primeiro teste
technicRouter.put("/results/firstTest/:userId", session, authorize, testController.updateFirstResult);

//Registo resultado do segundo teste
technicRouter.put("/results/secondTest/:userId", session, authorize, testController.updateSecondResult);

//Listar todos os testes
technicRouter.get("/tests/all", session, authorize, testController.getOrdersTech);

//Listar todos os utentes infetados
technicRouter.get("/tests/infected", session, authorize, testController.getOrdersTechInfected);

//Listar todos os utentes que não têm o resultado do primeiro teste
technicRouter.get("/tests/first", session, authorize, testController.getOrdersTechFirstResult);

//Listar todos os utentes que não têm o resultado do segundo teste
technicRouter.get("/tests/second", session, authorize, testController.getOrdersTechSecondResult);

//Listar todos os utentes que ainda não têm a data dos testes
technicRouter.get("/tests/dates", session, authorize, testController.getOrdersTechDates);

//testes por id
technicRouter.get("/results/:userId", testController.getOrderById);

//Agendar primeiro teste
technicRouter.put("/scheduleTest/:userId", session, authorize, testController.scheduleFirstTest);

module.exports = technicRouter