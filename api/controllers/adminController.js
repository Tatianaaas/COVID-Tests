const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createAdmin = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                username: req.body.username,
                password: hash,
                role: "administrador"
            });

            user
                .save()
                .then(result => {
                    res.status(201).json({
                        message: 'Sign up successful!',
                        result: result
                    });
                })

            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
        });
}

//Atualizar password do administrador, não consigo fazer
const updateAdminPassword = async(req, res) => {

}

/*  Criar técnicos
    Enunciado: "O administrador da plataforma tem a responsabilidade de registar os técnicos de 
    laboratório na plataforma." */
const createTechnics = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                username: req.body.username,
                password: hash,
                role: "tecnico"
            });

            user
                .save()
                .then(result => {
                    res.status(201).json({
                        message: 'Sign up successful!',
                        result: result
                    });
                })

            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
        });
}

const deleteUser = async(req, res) => {
    const deleteUser = await User.findByIdAndDelete(req.params.userId)
    res.send(deleteUser)
}

module.exports = {
    createAdmin,
    updateAdminPassword,
    createTechnics,
    deleteUser
}