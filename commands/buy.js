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
        const started = new Date();
        message.channel.send(new Discord.MessageEmbed().setTitle("Generating orders...").setColor(9807270)).then(async (msg) => {

            db.User.updateOne({
                _id: user._id
            }, {
                $inc: {
                    coins: -parseInt(args[0]) * 100
                }
            }).exec()
            let orders = []
            const template = {
                guild: message.channel.guild.id
            }
            for (let i = 0; i < parseInt(args[0]); i++) {
                orders.push(template)
            }
            await db.Order.insertMany(orders)
            let bought = new Discord.MessageEmbed()
                .setTitle(`Bought ${buyamount} Members.`)
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setDescription(`There are currently \`${await db.Order.countDocuments({
                    guild: message.guild.id
                })}\` invites pending for \`${message.guild.name}\`.\nThis could take some time... Large orders have priority\n[*(click here for support)*](${process.env.SUPPORT_LINK})`)
                .setThumbnail(message.guild.iconURL())
                .setColor(9807270)
                .setTimestamp();
            const stopped = new Date();
            bought.setFooter(`message took ${stopped - started}ms to send`);
            msg.edit(bought).catch(err => { return; })
            let iconurlz = message.guild.iconURL({
                dynamic: true
            });
            if (!iconurlz) {
                await db.Guild.updateOne({
                    _id: message.guild.id
                }, {
                    $set: {
                        name: message.guild.name
                    }
                })
                return;
            } else {
                await db.Guild.updateOne({
                    _id: message.guild.id
                }, {
                    $set: {
                        iconurl: iconurlz,
                        name: message.guild.name
                    }
                })
            }
        }).catch((err) => { return; })
    },
}
