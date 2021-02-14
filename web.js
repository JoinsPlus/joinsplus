require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.static('vue/dist'))

app.listen(process.env.PORT)
