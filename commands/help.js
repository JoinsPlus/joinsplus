const Discord = require("discord.js");
module.exports = {
	name: 'help',
	description: 'help cmd',
	cooldown: 3,
	execute(message, args, client) {
		var sentembed = new Discord.MessageEmbed()
			.setTitle("Joins+ Help")
			.setAuthor(message.author.username, message.author.displayAvatarURL())
		.setDescription(`\`${process.env.PREFIX}f/find/j/join\`\nSends the server you need to join to earn coins\n\n\`${process.env.PREFIX}buy\`\nBuy Members\n\n\`${process.env.PREFIX}coins/bal/b/balance/money <USER/NOTHING>\`\nShows your current balance\n\n\`${process.env.PREFIX}daily\`\nCan be used every 24h and gives you 3 coins\n\n\`${process.env.PREFIX}invite\`\nSends you the bot invite link\n\n\`${process.env.PREFIX}pay <USER> <AMOUNT>\`\nTransfers coins to someone else\n\n\`${process.env.PREFIX}ping\`\nShows the bots ping\n\n\`${process.env.PREFIX}support\`\nSends an invite link to the official joins+ support server\n\n\`${process.env.PREFIX}stats\`\nShows the bot statistics\n[(join support here)](${process.env.SUPPORT_LINK}) [(bot invite here)](${process.env.INVITE_LINK})`)
			.setThumbnail(client.user.displayAvatarURL())
			.setColor(9807270)
			.setTimestamp();
		message.channel.send(sentembed).catch((err) => { return; })
	},
};