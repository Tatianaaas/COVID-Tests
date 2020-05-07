const express = require('express')
const jwt = require('jsonwebtoken')

const userController = require('../controllers/userController')
const userRouter = express.Router()

/*
function verifyJWT(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}
*/

//Sign up (utente)
userRouter.post('/signup', userController.createUser);
//Login
userRouter.post('/login', userController.loginUser);

//vou colocar aqui as rotas que sao responsaveis pelo criar, editar, atualizar e remover utlizidador
//como o create ja esta a ser utilizado no signup , penso que nao preciso de colocar outra vez
//Ver um determinado utilizador pelo ID
userRouter.get("/show/:userId", /*verifyJWT,*/ userController.getUserById);
//Editar utilizador
userRouter.put("/update/:userId", /*verifyJWT,*/ userController.updateUser);

module.exports = userRouter