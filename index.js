const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('./db')

client.on("ready", () => {
    console.log("Logged into "+client.user.username)
    client.user.setActivity("mit Members", { type: 'PLAYING' })
})

client.on('message', async (msg) => {
    if (msg.content.toLocaleLowerCase() == "profile") {
        let user = await db.User.findOne({
            _id: msg.author.id
        })
        if (!user) {
            user = new db.User({
                _id: msg.author.id
            })
            await user.save()
        }
        msg.reply(new Discord.MessageEmbed().setTitle("Profile Information").setThumbnail(msg.author.displayAvatarURL).setAuthor(msg.author.username).addField("Coins", user.coins, true))
    }
})

client.on("message", message => {
    if(message.content != "test") return;
    message.channel.send("Im working.")
})
client.login(process.env.TOKEN);