const jwt = require('jsonwebtoken')

class Session {
    constructor(id) {
        this.id = id
    }
    static validate(jwt) {
        return new Promise((resolve, reject) => {
            jwt.validate(jwt)
        })
    }
}