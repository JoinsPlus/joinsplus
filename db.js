const DiscordOauth2 = require("discord-oauth2")
const { settings } = require('cluster')
const NodeCache = require('node-cache')
const mongoose = require('mongoose')
const oauth = new DiscordOauth2({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: encodeURIComponent(process.env.REDIRECT_URL)
})
const crypto = require('crypto')
const guildStatCache = new NodeCache({
    stdTTL: 600 //10 minute in seconds
})
const guildCache = new NodeCache({
    stdTTL: 600 //10 minute in seconds
})
const axios = require('axios').default

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.pia0b.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

module.exports = {
    User: mongoose.model('user', {
        _id: { /* Discord ID */
            type: String,
            required: true
        },
        username: {
            type: String
        },
        discriminator: {
            type: String
        },
        bot: {
            type: Boolean
        },
        coins: { /* The coins the user has */
            type: Number,
            default: 0
        },
        daily: {
            lastClaim: {
                type: Number,
                default: 0
            },
            banned: {
                type: Boolean,
                default: false
            }
        },
        ignored: {
            type: Array,
            default: []
        },
        oauth: {
            access_token: {
                type: String
            },
            refresh_token: {
                type: String
            },
            expires: {
                type: Number,
                default: 0
            }
        },
        history: {
            type: Array,
            default: []
        }
        /* idk what parameters u want here */
    }),
    async getUser(id) {
        let user = await this.User.findOne({
            _id: id
        })
        if (!user) {
            await this.User.updateOne({
                _id: id
            }, {
                $set: {
                    _id: id
                }
            }, {
                upsert: true
            })
            user = this.getUser(id)
        }
        return user
    },
    Guild: mongoose.model('guild', {
        _id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            default: "No name set!"
        },
        iconurl: {
            type: String
        },
        owner: {
            type: String
        },
        description: {
            type: String
        },
        ignoredChannels: {
            type: Array,
            default: []
        },
    }),
    async getGuild(id) {
        let guild = await this.Guild.findOne({
            _id: id
        })
        if (!guild) {
            guild = new this.Guild({
                _id: id
            })
            await guild.save()
        }
        return guild;
    },
    Order: mongoose.model('order', {
        owner: { /* The ID of the user who claims this order. An order is claimed when a user gets offered this all the way until the end of the required time to be in the guild */
            type: String
        },
        guild: {
            type: String,
            required: true
        },
        completed: { /* Unix timestamp 1 Week after the user joins the guild, undefined if not joined */
            type: Number
        },
        expires: { /* If user hasn't joined the guild after this, it gets released back into the pool of claimable orders */
            type: Number
        },
        awarded: {
            type: Number
        }
    }),
    // Boost: mongoose.model('boost', {
    //     valid: {
    //         type: Boolean,
    //         default: true
    //     },
    //     owner: {
    //         type: String,
    //         required: true
    //     },
    //     booster: {
    //         type: String
    //     }, 
    //     guild: {
    //         type: String,
    //         required: true
    //     },
    //     lastReward: {
    //         type: Number
    //     },
    //     rewardCount: {
    //         type: Number
    //     }
    // }),
    captchaGen() {
        let code = randomnum(1, 9)
        let encrypted = encrypt(JSON.stringify([
            code,
            randomnum(25, 100),
            randomnum(1, randomnum(1, 50)),
            randomnum(-30, 15),
            `${"#" + ((1 << 24) * Math.random() | 0).toString(16)}`,
            randomnum(1, 50),
            randomnum(0, 40),
            randomnum(0, 40),
            Date.now()
        ]))
        return {
            url: `https://api.dojnaz.net/joinsplus/captcha/${encrypted.content}.${encrypted.iv}.jpg`, //.jpg is not needed, it's only so that cloudflare thinks it's a static image
            code: code
        }
    },
    async getGuildInvite(requirements) { //TODO: Call API
        return new Promise(async (resolve, reject) => {
            let encrypted = encrypt(JSON.stringify(requirements))
            axios.get(`https://api.dojnaz.net/joinsplus${process.env.ISDEBUG === "true" ? "beta" : ""}/claimorder/${encrypted.content}.${encrypted.iv}`).then(async (response) => {
                if (response.data.status) return resolve(response.data)
                resolve(await this.getGuild(response.data.guild))
            }).catch((err) => {
                console.log(`getGuildInvite HTTP Error: ${err.response ? err.response.status : err}`)
                reject("Couldn't contact API")
                return
            })
            /*let guild = await this.getGuild('809771579910127656')
            resolve(guild)*/
        })
    },
    async guildStats(id) {
        return new Promise(async (resolve, reject) => {
            if (guildStatCache.has(id)) {
                resolve(await Promise.resolve(guildStatCache.get(id)))
            }
        })
    },
    async getCachedGuild(id) {
        return new Promise(async (resolve, reject) => {
            if (guildCache.has(id)) return resolve(guildCache.get(id))
            let guild = await this.getGuild(id)
            guildCache.set(id, guild)
            resolve(guild)
        })
    },
    purgeCachedGuild(id) {
        if (guildCache.has(id))
            guildCache.del(id)
    },
    refreshToken(user) {
        oauth.tokenRequest({
            grantType: 'refresh_token',
            refreshToken: user.oauth.refresh_token
        })
    }
}
