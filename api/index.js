const express = require('express')

const userRouter = require('./routes/users-router')
const adminRouter = require('./routes/admin-router')
const tecnicRouter = require('./routes/tecnic-router')

const apiRouter = express.Router()


apiRouter.get('/', (req, res) => {
    res.send({
        status: 'ok'
    })
})

apiRouter.use('/user', userRouter)
apiRouter.use('/admin', adminRouter)
apiRouter.use('/technic', tecnicRouter)

module.exports = apiRouter