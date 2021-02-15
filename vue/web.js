require('dotenv').config()
const express = require('express')
const app = express()

app.get('/support', (req, res) => {
    res.redirect(process.env.SUPPORT_LINK)
})
app.get('/invite', (req, res) => {
    res.redirect(process.env.INVITE_LINK)
})

app.use(express.static('vue/dist'))

app.listen(process.env.PORT)
