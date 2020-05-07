require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const apiRouter = require('./api')
const adminRouter = require('./api/routes/admin-router');
const tecnicRouter = require('./api/routes/tecnic-router');
const userRouter = require('./api/routes/users-router');

const app = express()
mongoose.Promise = global.Promise

const {
    PORT = 3000,
        MONGO_DB_HOST = 'localhost',
        MONGO_BD_PORT = 27017,
        MONGO_DB_NAME = 'demo2'
} = process.env

mongoose
    .connect(
        `mongodb://${ MONGO_DB_HOST }:${ MONGO_BD_PORT }/${ MONGO_DB_NAME }`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    )
    .then((mongoose) => {
        console.log('connected to mongo')
    })
    .catch(console.error)

app.use(express.json())

app.set('views', path.join(__dirname, './api/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', apiRouter)
app.use('/user/', userRouter);
app.use('/admin/', adminRouter);
app.use('/technic/', tecnicRouter)

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})

module.exports = app;