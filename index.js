require('dotenv').config()
const { ShardingManager } = require('discord.js')
const manager = new ShardingManager('./bot.js', {
    token: process.env.TOKEN,
    totalShards: parseInt(process.env.SHARD_COUNT)
})
const db = require('./db')
    manager.on('shardCreate', shard => console.log(`[ Shard #${shard.id} ] Loading shard...`))
    try {
        manager.spawn()
    } catch (error) {
        console.log(error)
    }