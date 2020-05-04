const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Código em falta

const createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                username: req.body.username,
                password: hash,
                role: "utilizador"
            });

            user
                .save()
                .then(result => {
                    res.status(201).json({
                        message: 'User criado!',
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

const loginUser = (req, res, next) => {
    let fetchedUser;

    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }

            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })

    .then(result => {
        if (!result) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }

        /*
        const token = jwt.sign({ username: fetchedUser.username, userId: fetchedUser._id },
            'segredo_para_a_criacao_dos_tokens', { expiresIn: '30m' }
        );
        */

        const message = "Login successful"

        res.status(200).json({
            message,
            expiresIn: 1800,
            userId: fetchedUser._id,
            name: fetchedUser.name,
            role: fetchedUser.role
        });
    })

    .catch(err => {
        return res.status(401).json({
            message: 'Auth failed'
        });
    });
}

module.exports = {
    //Código em falta
    createUser,
    loginUser
}