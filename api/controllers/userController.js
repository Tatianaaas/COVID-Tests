const User = require('../models/User')
const Test = require('../models/Test')
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
                role: "UTENTE"
            });
            
            user
                .save()
                .then(result => {
                    console.log(user._id, user.name)
                                
                    const test = new Test({
                        _id:user._id,
                        nomeUtente: user.name
                    });
                
                    test.save().then(testeCriado => {
                        res.status(201).json({
                            message: 'User adicionado com sucesso',
                            test: {
                                ...testeCriado,
                                id: testeCriado._id
                            }
                        });
                    }).catch(error => {
                        res.status(500).json({
                            message: 'Pedido de teste falhou!!'
                        });
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        });
    /* 
    console.log(user)
    res.redirect(`/${user._id}`) */
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
            expiresIn: 180000,
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

const logout = (req, res) => {
    let token = req.headers.authorization.split(" ")[1];
    token = null

    res.send("Logout successful")
}

module.exports = {
    createUser,
    loginUser,
    getUserById,
    updateUser,
    logout
}