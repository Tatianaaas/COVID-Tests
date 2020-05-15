const express = require('express')
const userController = require('./controllers/userController')
const userRouter = require('./routes/users-router')
const adminRouter = require('./routes/admin-router')
const tecnicRouter = require('./routes/tecnic-router')
const apiRouter = express.Router()

apiRouter.get('/', (req, res) => {
    res.send("Bem vindo!");
})
//Login
apiRouter.post('/login', userController.loginUser);
//Sign up 
apiRouter.post('/signup', userController.createUser);



apiRouter.use('/user', userRouter)
apiRouter.use('/admin', adminRouter)
apiRouter.use('/technic', tecnicRouter)

module.exports = apiRouter