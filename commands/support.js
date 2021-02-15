const Discord = require("discord.js");
module.exports = {
	name: 'support',
	description: 'support server link',
    cooldown: 3,
	execute(message, args) {
		var sentembed = new Discord.MessageEmbed()
		.setTitle("Sent. Check your DMs!")
		.setAuthor(message.author.username, message.author.displayAvatarURL())
		.setDescription(`Got no message? Try manual [(click here)](${process.env.SUPPORT_LINK})`)
		.setThumbnail(client.user.displayAvatarURL())
		.setColor(9807270)
		.setTimestamp();
		message.channel.send(sentembed).catch((err) => {return;})
		message.author.send("**Official Joins+ Support:** "+process.env.SUPPORT_LINK).catch((err) => {return;})
	},
};