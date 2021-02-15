const Discord = require("discord.js");
const db = require('../db')
module.exports = {
	name: 'invite',
	description: 'sends the bot invite link',
    cooldown: 2,
	async execute(message, args, client) {
        var sentembed = new Discord.MessageEmbed()
		.setTitle("Sent. Check your DMs!")
		.setAuthor(message.author.username, message.author.displayAvatarURL())
		.setDescription(`Got no message? Try manual [(click here)](${process.env.INVITE_LINK})`)
		.setThumbnail(client.user.displayAvatarURL())
		.setColor(9807270)
		.setTimestamp();
		message.channel.send(sentembed).catch((err) => {return;})
		message.author.send("**Official Joins+ Invite Link:** "+process.env.INVITE_LINK+"\n**Support Server:** "+process.env.SUPPORT_LINK).catch((err) => {return;})
	},
};