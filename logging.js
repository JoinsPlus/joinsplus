const Discord = require('discord.js')
const db = require("./db")

class Logger {
    /**
     * @param {Discord.Client} client
     */
    constructor(client, id) {
        this.log = {
            cmdCount: 0,
            discordEvents: {}
        }
        //console.log(Discord.Constants.Events)
        Object.keys(Discord.Constants.Events).map((_event) => {
            let event = Discord.Constants.Events[_event]
            client.on(event, () => {
                if (client.shard.count != parseInt(process.env.SHARD_COUNT)) return;
                if (!this.log.discordEvents) this.log.discordEvents = {};
                if (!this.log.discordEvents[event]) this.log.discordEvents[event] = 0;
                this.log.discordEvents[event]++
            })
        })
        client.on('ready', () => {
            setInterval(async () => {
                if (client.shard.count != parseInt(process.env.SHARD_COUNT)) return;
                //const ShardMembers = await client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)')
                //const totalMembers = ShardMembers.reduce((acc, memberCount) => acc + memberCount, 0);
                let date = new Date()
                date.setMilliseconds(0)
                date.setSeconds(0)
                let update = {}
                if (this.log.cmdCount) update.cmdCount = this.log.cmdCount
                let keys = Object.keys(this.log.discordEvents)
                for (let i = 0; i < keys.length; i++) {
                    update[keys[i]] = this.log.discordEvents[keys[i]]
                }
                console.log(update)
                if (Object.keys(update).length)
                await db.Log.updateOne({
                    timestamp: date.getTime()
                }, {
                    $inc: update
                }, {
                    upsert: true
                })
                //console.log(`Shard ${id}`, this.log)
                this.log = {
                    cmdCount: 0,
                    discordEvents: {}
                }
            }, 5000)
        })
    }
    logCmd() {
        if (!this.log.cmdCount) this.log.cmdCount = 0
        this.log.cmdCount++
    }
}

module.exports = Logger
