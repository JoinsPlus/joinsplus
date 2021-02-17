const Discord = require("discord.js");
const db = require('../db')

module.exports = {
    name: 'buy',
    description: 'Buy Members',
    cooldown: 5,
    /**
     * @param {Discord.Message} message
     */
    async execute(message, args, client) {
        if (!args[0]) return message.reply(`Wrong usage!\n${process.env.PREFIX}buy <AMOUNT>`).catch((err) => { return; });
        if (isNaN(args[0])) return message.reply(`Wrong usage!\n${process.env.PREFIX}buy <MEMBERS>`).catch((err) => { return; });
        if (args[0] < 8) return message.reply(`Wrong usage!\nYou can't buy less than 8 invites.`).catch((err) => { return; });
        let user = await db.getUser(message.author.id)
        let buyamount = parseInt(args[0])
        if (user.coins < buyamount * 100) return message.reply(`You didn't got enough Coins to buy Members.`).catch((err) => { return; });

        db.User.updateOne({
            _id: user._id
        }, {
            $inc: {
                coins: -parseInt(args[0]) * 100
            }
        }).exec()
        let guildz = await db.Guild.findOneAndUpdate({
            _id: message.guild.id
        }, {
            $inc: {
                coins: parseInt(args[0]) * 100
            },
            $set: {
                name: message.guild.name
            }
        }).exec()
        guildz.coins+=parseInt(args[0]) * 100

        let bought = new Discord.MessageEmbed()
            .setTitle(`Bought ${buyamount} Members.`)
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setDescription(`There are currently \`${guildz.coins / 100}\` invites pending for \`${guildz.name}\`.\nThis could take some time... Large orders have priority\n[*(click here for support)*](${process.env.SUPPORT_LINK})`)
            .setThumbnail(message.guild.iconURL())
            .setColor(9807270)
            .setTimestamp();
        message.channel.send(bought).catch(err => { return; })
    },
}
