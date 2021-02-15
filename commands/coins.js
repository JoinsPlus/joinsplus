const Discord = require("discord.js");
const db = require('../db')
module.exports = {
	name: 'coins',
	description: 'Shows Users current Coins',
    aliases: ['bal', 'b', 'balance'],
    cooldown: 2,
	async execute(message, args, client) {
        if(!args[0]) {
        let user = await db.getUser(message.author.id)
		let sentembed = new Discord.MessageEmbed()
		.setTitle("Coins")
		.setAuthor(message.author.username, message.author.displayAvatarURL())
		.setDescription(`\`${user.coins / 100}\``)
		.setColor(9807270)
		.setTimestamp();
		message.channel.send(sentembed).catch((err) => {return;})    
        }else if(args[0]) {
            const usertag = message.mentions.users.first();
            if(usertag) {
                if(usertag.bot) return message.reply("Bots can't use Joins+.").catch(err => {return;})
                let user = await db.getUser(usertag.id)
                let someoneelse = new Discord.MessageEmbed()
                .setTitle("Coins")
                .setAuthor(usertag.username, usertag.displayAvatarURL())
                .setDescription(`\`${user.coins / 100}\``)
                .setColor(9807270)
                .setTimestamp();
                message.channel.send(someoneelse).catch((err) => {return;})  
            }else{
                message.reply("Wrong usage!"+`\n${process.env.PREFIX}coins <MEMBER>`).catch(err => {return;})
            }
        }
        
	},
};