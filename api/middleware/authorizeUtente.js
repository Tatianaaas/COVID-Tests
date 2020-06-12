const session = require("./session")

const User = require('../models/User')
const jwt = require('jsonwebtoken')

const authorize = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, 'segredo_para_a_criacao_dos_tokens')

    try {
        const user = await User.find({ _id: data.userId, role: 'UTENTE' })
        console.log(user)

        if (user.length == 0) {
            throw new Error()
        }

        req.user = user
        req.role = user.role
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}

module.exports = authorize