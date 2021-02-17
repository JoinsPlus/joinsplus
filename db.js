const mongoose = require('mongoose')

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
        }
        /* idk what parameters u want here */
    }),
    async getUser (id) {
        let user = await this.User.findOne({
            _id: id
        })
        if (!user) {
            user = new this.User({
                _id: id
            })
            await user.save()
        }
        return user;
    },
    Guild: mongoose.model('guild', {
        _id: {
            type: String,
            required: true
        },
        coins: { /* The Number of Members that need to join the Server after they bought Ads */
            type: Number,
            default: 0
        },
        name: {
            type: String,
            default: "No name set!"
        }
    }),
    async getGuild(id) {
        let guild = await this.Guild.findOne({
            _id: id
        })
        if(!guild){
            guild = new this.Guild({
                _id: id
            })
            await guild.save()
        }
        return guild;
    },
    Reward: mongoose.model('reward', { /* An instance of this is created when a user joins using our invite, and gets reversed if the user leaves. */
        owner: { // The ID of the user
            type: String,
            required: true
        },
        guild: {
            type: String,
            required: true
        },
        awards: {
            type: Number,
            required: true
        },
        expires: {
            type: Number,
            required: true
        }
    })
}
