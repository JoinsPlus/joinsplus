const Discord = require("discord.js");
const db = require('../db')
module.exports = {
    name: 'coins',
    description: 'Shows Users current Coins',
    aliases: ['bal', 'b', 'balance', 'money'],
    cooldown: 2,
    /**
     * @param {Discord.Message} message
     * @param {String[]} args
     * @param {Discord.Client} client
     */
    async execute(message, args, client) {
        if (!args[0]) {
            let user = await db.getUser(message.author.id)
            let sentembed = new Discord.MessageEmbed()
                .setTitle("Coins")
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setDescription(`\`${user.coins / 100}\``)
                .setColor(9807270)
                .setTimestamp();
            let history = user.history.toObject();
            if (history.length != 8) {
                sentembed.addField(`Last ${history.length} transactions`, "```" + (history.slice(-8).reverse().join('\n') || "No history yet!") + "```")
            } else {
                sentembed.addField("Last 8 transactions", "```" + (history.slice(-8).reverse().join('\n') || "No history yet!") + "```")
            }
            sentembed.setFooter(`All transactions: ${history.length}`)
            message.channel.send(sentembed).catch((err) => { return; })
        } else if (args[0]) {
            const usertag = message.mentions.users.first()
            const userdb = await db.User.findOne({
                _id: args[0]
            });
            if ((usertag || userdb) && (usertag.bot != true || userdb.bot != true)) {
                if (usertag.bot) return message.reply("Bots can't use Joins+.").catch(err => { return; })
                let user = await db.getUser(usertag.id)
                let someoneelse = new Discord.MessageEmbed()
                    .setTitle("Coins")
                    .setAuthor((usertag.username || userdb.username || userdb._id), (usertag.displayAvatarURL() || "https://yt3.ggpht.com/ytc/AAUvwniEUaBNWbH9Pk7A1cmIBdxnYt0YYrgNKx5h8grSMA=s176-c-k-c0x00ffffff-no-rj"))
                    .setDescription(`\`${user.coins / 100}\``)
                    .setColor(9807270)
                    .setTimestamp();
                message.channel.send(someoneelse).catch((err) => { return; })
            } else {
                message.reply("Wrong usage!" + `\n${process.env.PREFIX}coins <MEMBER>`).catch(err => { return; })
            }
        }
    },
};