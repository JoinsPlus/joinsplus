const DiscordOauth2 = require("discord-oauth2")
const express = require('express')
const oauth = new DiscordOauth2()
const router = express.Router()
const db = require('../../db')
const cors = require('cors')
const discordOAuth = {
    secret: process.env.CLIENT_SECRET,
    client_id: process.env.CLIENT_ID,
    redirect: encodeURIComponent(process.env.REDIRECT_URL)
}

const privateCors = {
    origin: process.env.VUE_APP_API,
    optionsSuccessStatus: 200
}

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
                res.json({
                    success: true,
                    user: user
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

module.exports = router
