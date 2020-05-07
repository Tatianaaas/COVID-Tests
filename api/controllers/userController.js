const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
    JWT_SECRET = 'segredo_para_a_criacao_dos_tokens'
} = process.env

const createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                username: req.body.username,
                password: hash,
                role: "utente"
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

const loginUser = (req, res, next) => {
    let fetchedUser;

    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Authentication failed'
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

        const token = jwt.sign({ username: fetchedUser.username, userId: fetchedUser._id },
            JWT_SECRET, { expiresIn: '30m' }
        );

        const message = "Login successful"

        res.status(200).json({
            message,
            token,
            expiresIn: 1800,
            userId: fetchedUser._id,
            name: fetchedUser.name,
            role: fetchedUser.role
        });
    })

    .catch(err => {
        return res.status(401).json({
            message: 'Authentication failed'
        });
    });
}

const getUserById = async(req, res) => {
    try {
        console.log('ID', req.params.userId)
        const userResult = await User.findById(req.params.userId);
        console.log(userResult)
        res.render('users/show', { user: userResult })
    } catch (e) {
        console.error(e)
        res.status(404)
        res.send(null)
    }
}

const updateUser = async(req, res) => {
    const oldUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body
    )

    const newUser = await User.findById(
        req.params.userId,
    )

    res.send({
        old: oldUser,
        new: newUser
    })
}

module.exports = {
    createUser,
    loginUser,
    getUserById,
    updateUser
}