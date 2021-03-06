process.on('unhandledRejection', (error, promise) => {
    console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
    console.log(' The error was: ', error);
})
require('dotenv').config({
    path: './../.env'
})
const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const fs = require('fs')
const app = express()

var store = new MongoDBStore({
    uri: `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.pia0b.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,
    collection: 'mySessions'
})
store.on('error', function (error) {
    console.log(error);
})
app.use(require('express-session')({
    secret: 'VeryEpicSecretInnit',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true
}))
app.use(require('./routes'))

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})
