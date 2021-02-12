const Discord = require('discord.js')
const client = new Discord.Client()

client.on("ready", () => {
    console.log("Logged into "+client.user.username)
    client.user.setActivity("mit Members", { type: 'PLAYING' });
})
client.on("message", message => {
    if(message.content != "test") return;
    message.channel.send("Im working.")
})
client.login(process.env.TOKEN);