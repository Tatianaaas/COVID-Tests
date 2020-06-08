const User = require('../models/User')
const bcrypt = require('bcrypt');

const updateAdminPassword = async(req, res) => {
    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
    }

    const oldUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body
    )

    const newUser = await User.findById(
        req.params.userId
    )

    res.send({
        old: oldUser,
        new: newUser
    })
}

const createTechnics = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                username: req.body.username,
                password: hash,
                role: "TECH"
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
    res.send(deleteUser);
}

const getUsers = async(req, res) => {
    const userList = await User.find().sort({ role: 1 });
    res.send(userList)
}

module.exports = {
    updateAdminPassword,
    createTechnics,
    deleteUser,
    getUsers
}