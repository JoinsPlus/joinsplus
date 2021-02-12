const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json');

client.on("ready", () => {
    console.log("Logged into "+client.user.username)
    client.user.setActivity("mit Members", { type: 'PLAYING' });
})

client.login(process.env.TOKEN);