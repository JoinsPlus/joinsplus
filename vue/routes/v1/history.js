const express = require('express')
const router = express.Router()
const Session = require('../session')

router.get('/', Session.privateCors, Session.jwtMiddleWare, (req, res) => {
    res.json({
        endpoint: 'history'
    })
})

module.exports = router
