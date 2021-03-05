process.on('unhandledRejection', (error, promise) => {
    console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
    console.log(' The error was: ', error);
})
require('dotenv').config({
    path: './../.env'
})
const express = require('express')
const fs = require('fs')
const app = express()

app.use(require('./routes'))


app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})
