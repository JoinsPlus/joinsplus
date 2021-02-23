const express = require('express')
const router = express.Router()

router.use(express.static("vue/dist"))

router.get('/*', (req, res) => {
    res.sendFile('vue/dist/index.html')
})

module.exports = router
