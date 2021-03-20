const DiscordOauth2 = require("discord-oauth2")
const Session = require('./session')
const express = require('express')
const oauth = new DiscordOauth2()
const router = express.Router()
const db = require('../../db')
const cors = require('cors')
const Path = require('path')
const fs = require('fs')
const discordOAuth = {
    secret: process.env.CLIENT_SECRET,
    client_id: process.env.CLIENT_ID,
    redirect: encodeURIComponent(process.env.REDIRECT_URL)
}

const privateCors = {
    origin: process.env.VUE_APP_MAIN,
    optionsSuccessStatus: 200
}

router.get('/', Session.privateCors, Session.jwtMiddleWare, (req, res) => {
    res.json({
        hi: "there",
        session: req.session
    })
})

/*router.get('/gen/:id', (req, res) => {
    let session = new Session(req.params.id)
    res.send(session.getJWT())
})*/

router.get('/support', (req, res) => {
    res.redirect(process.env.SUPPORT_LINK)
})

router.get('/login', cors(privateCors), (req, res) => {
    if (req.query.code) {
        oauth.tokenRequest({
            clientId: discordOAuth.client_id,
            clientSecret: discordOAuth.secret,

            code: req.query.code,
            grantType: 'authorization_code',

            redirectUri: decodeURIComponent(discordOAuth.redirect)
        }).then((data) => {
            console.log(data)
            oauth.getUser(data.access_token).then((user) => {
                console.log(user)
                let session = new Session(user.id)
                res.json({
                    success: true,
                    user: user,
                    jwt: session.getJWT()
                })
                db.getUser(user.id).then((user) => {
                    user.oauth = {
                        access_token: data.access_token,
                        refresh_token: data.refresh_token,
                        expires: Date.now() + (data.expires_in * 1000) - 25000
                    }
                    user.save()
                })
            })
        }).catch((err) => {
            res.send(err.message)
        })
        return
    }
    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${discordOAuth.client_id}&redirect_uri=${discordOAuth.redirect}&response_type=code&scope=identify%20guilds%20guilds.join&prompt=none`)
})

function generateRouter(folder, relativePath) {
    fs.readdir(__dirname + '/v1', (err, files) => {
        if (err) return console.error(err)
        for (let i = 0; i < files.length; i++) {
            fs.stat(Path.join(folder, files[i]), (err, stats) => {
                if (err) return console.error(err)
                if (stats.isDirectory()) {
                    generateRouter(Path.join(folder, files[i]), Path.join(relativePath, files[i]))
                } else {
                    if (!files[i].endsWith('.js')) return
                    let file = files[i].split('.')
                    file.pop()
                    router.use(Path.join(relativePath, file.join('.')).replace(/\\/g, '/'), require(Path.join(folder, files[i])))
                    console.log('Loaded ' + Path.join(relativePath, file.join('.')).replace(/\\/g, '/'))
                }
            })
        }
    })
}

generateRouter(Path.join(__dirname, '/v1'), '/v1')

module.exports = router
