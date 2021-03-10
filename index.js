require('dotenv').config()
const { ShardingManager } = require('discord.js')
const manager = new ShardingManager('./bot.js', {
    token: process.env.TOKEN,
    totalShards: 2
})

manager.on('shardCreate', shard => console.log(`[ Shard #${shard.id} ] Loading shard...`))
manager.spawn()
