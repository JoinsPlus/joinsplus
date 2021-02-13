const express = require('express')
const app = express()

app.use(express.static('vue/dist'))

app.listen(8000)
