const User = require('../models/User')
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');

//Código em falta
const createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                tipo: "utilizador"
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

    User.findOne({ email: req.body.email })
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

        const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id },
            'segredo_para_a_criacao_dos_tokens', { expiresIn: '30m' }
        );

        res.status(200).json({
            token,
            expiresIn: 1800,
            userId: fetchedUser._id,
            tipo: fetchedUser.tipo
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