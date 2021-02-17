require('dotenv').config({
    path: './../.env'
})
const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.static('dist'))

app.use('/api', require('./routes'))

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})
