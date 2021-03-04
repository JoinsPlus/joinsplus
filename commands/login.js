const Discord = require("discord.js")

module.exports = {
    name: 'login',
    description: 'Sends login Link',
    cooldown: 5, 
    async execute(message, args, client) {
        var sentembed = new Discord.MessageEmbed()
        .setTitle("Sent. Check your DMs!")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(`Got no message? Try manual [(click here)](${process.env.REDIRECT_URL})`)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(9807270)
        .setTimestamp();
    message.channel.send(sentembed).catch((err) => { return; })
    message.author.send("**Login to use the Bot:** " + process.env.REDIRECT_URL).catch((err) => { return; })
    }
}