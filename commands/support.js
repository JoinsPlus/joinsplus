const Discord = require("discord.js");
module.exports = {
	name: 'support',
	description: 'support server link',
    cooldown: 5,
	execute(message, args) {
		var sentembed = new Discord.MessageEmbed()
		.setTitle("Sent. Check your DMs")
		.setAuthor(message.author.username, message.author.displayAvatarURL())
		.setDescription("Got no message? Try manual [(click here)](https://discord.gg/v6pzSPHkjX)")
		.setThumbnail("https://cdn.discordapp.com/avatars/810481979866480670/c40155d12d84fd1a87ecb38acee24913.webp?size=128")
		.setColor(9807270);
		message.channel.send(sentembed).catch((err) => {return;})
		message.author.send("**Official Joins+ Support:** https://discord.gg/v6pzSPHkjX").catch((err) => {return;})
	},
};