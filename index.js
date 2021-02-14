require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('./db')

client.on("ready", () => {
    console.log("Logged into "+client.user.username)
    client.user.setActivity("mit Members", { type: 'PLAYING' })
})

client.on('message', async (msg) => {
    if (msg.content.toLocaleLowerCase() == "profile") {
        let user = await db.getUser(msg.author.id)
        msg.reply(new Discord.MessageEmbed().setAuthor(msg.author.username, msg.author.displayAvatarURL()).addField("Coins", user.coins, true).setColor(1146986))
    }
    
    if (msg.content.toLocaleLowerCase() == "freecoin") {
        let user = await db.getUser(msg.author.id)
        user.coins += 1
        await user.save()
        msg.reply("I've given you a coin, you now have " + user.coins + " coins")
    }
    
    if (msg.content.toLocaleLowerCase() == "loosecoin") {
        let user = await db.getUser(msg.author.id)
        user.coins -= 1
        await user.save()
        msg.reply("I've took a from you, you now have " + user.coins + " coins")
    }
})




// JUST FOR TESTING
client.on("message", message => {
    if(message.content.toLocaleLowerCase() == "test"){
        message.channel.send("Its working.")
    }  
})
client.login(process.env.TOKEN);