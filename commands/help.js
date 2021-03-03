const Discord = require("discord.js");
module.exports = {
	name: 'help',
	description: 'help cmd',
	cooldown: 3,
	execute(message, args, client) {
		var sentembed = new Discord.MessageEmbed()
				.setTitle("Joins+ Help")
				.setAuthor(message.author.username, message.author.displayAvatarURL())
			.setDescription(`➜ | \`${process.env.PREFIX}f/find/j/join\`\n▫️Sends the server you need to join to earn coins\n\n➜ | \`${process.env.PREFIX}buy\`\n▫️Buy Members\n\n➜ | \`${process.env.PREFIX}coins/bal/b/balance/money <USER/NOTHING>\`\n▫️Shows your current balance\n\n➜ | \`${process.env.PREFIX}daily\`\n▫️Can be used every 24h and gives you 3 coins\n\n➜ | \`${process.env.PREFIX}invite\`\n▫️Sends you the bot invite link\n\n➜ | \`${process.env.PREFIX}pay <USER> <AMOUNT>\`\n▫️Transfers coins to someone else\n\n➜ | \`${process.env.PREFIX}ping\`\n▫️Shows the bots ping\n\n➜ | \`${process.env.PREFIX}support\`\n▫️Sends an invite link to the official joins+ support server\n\n➜ | \`${process.env.PREFIX}stats\`\n▫️Shows the bot statistics\n[join support](${process.env.SUPPORT_LINK}) **|** [bot invite](${process.env.INVITE_LINK})`)
				.setThumbnail(client.user.displayAvatarURL())
				.setColor(9807270)
				.setTimestamp();

			// .setTitle("Joins+ Help")
			// .setAuthor(message.author.username, message.author.displayAvatarURL())
			// .addField(`${process.env.PREFIX}f/find/j/join`, `\`Sends the server you need to join to earn coins\``, true)
			// .addField(`${process.env.PREFIX}buy`, `\`Buy Members\``, true)
			// .addField(`${process.env.PREFIX}stats`, `\`Shows the bot statistics\``, false)

			// .addField(`${process.env.PREFIX}coins/bal/b/balance/money <USER/NOTHING>`, `\`Shows your current balance\``, true)
			// .addField(`${process.env.PREFIX}pay <USER> <AMOUNT>`, `\`Transfers coins to someone else\``, true)
			// .addField(`${process.env.PREFIX}daily`, `\`Can be used every 24h and gives you 3 coins\``, false)

			// .addField(`${process.env.PREFIX}support`, `\`Sends an invite link to the official joins+ support server\``, true)
			// .addField(`${process.env.PREFIX}ping`, `\`Shows the bots ping\``, true)
			// .addField(`${process.env.PREFIX}invite`, `\`Sends you the bot invite link\``, false)
			// .setDescription(`[join support](${process.env.SUPPORT_LINK}) **|** [bot invite](${process.env.INVITE_LINK})`)
			// .setThumbnail(client.user.displayAvatarURL())
			// .setColor(9807270)
			// .setTimestamp();
		message.channel.send(sentembed).catch((err) => { return; })
	},
};