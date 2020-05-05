const express = require('express')

const userRouter = require('./routes/users-router')

const apiRouter = express.Router()

apiRouter.get('/', (req, res) => {
    res.send({
        status: 'ok'
    })
})

apiRouter.use('/users', userRouter)

module.exports = apiRouter