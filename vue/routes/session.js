const jws = require('jsonwebtoken')
const express = require('express')
const secret = process.env.JWT_SECRET

class Session {
    constructor(id) {
        this.id = id
    }
    getJWT() {
        return jws.sign({
            id: this.id,
            exp: Math.floor(Date.now() / 1000) + 86400
        }, secret)
    }
    static validateSession(jwt) {
        return new Promise((resolve, reject) => {
            jws.verify(jwt, secret, (err, data) => {
                if (err) reject(err)
                resolve(new Session(data.id))
            })
        })
    }
    /**
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     */
    static jwtMiddleWare(req, res, next) {
        if (!req.headers.authorization) {
            res.status(400).json({
                message: "No authorization token"
            })
            return
        }
        Session.validateSession(req.headers.authorization).then((session) => {
            req.session = session
            next()
        }).catch((err) => {
            res.send(err)
        })
    }
}

module.exports = Session
