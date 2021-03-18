const Discord = require("discord.js");
const db = require("../db")
module.exports = {
    name: 'pay',
    description: 'pay cmd',
    cooldown: 3,
    /**
     * @param {Discord.Message} message
     * @param {String[]} args
     * @param {Discord.Client} client
     */
    async execute(message, args, client) {
        const usertag = message.mentions.users.first();
        const userdb = await db.User.findOne({
                _id: args[0]
            });
        const Incorrect = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle("ERROR!")
            .setColor(15158332)
            .setDescription(`**Incorrect usage!**\n❕ \`${process.env.PREFIX}pay <MEMBER> <AMOUNT>\``);
        if (args[0] && (usertag || userdb)) {

            if (!args[1]) return message.channel.send(Incorrect).catch(err => { return; });
            if (!isNaN(args[1])) {

                if (args[1] < 1) return message.channel.send(new Discord.MessageEmbed().setTitle("ERROR!").setDescription(`**Incorrect usage!**\nYou can't pay less than 1 coin.`).setAuthor(message.author.username, message.author.displayAvatarURL()).setThumbnail(client.user.displayAvatarURL()).setColor(15158332)).catch(err => { return; });
                if (((usertag && usertag.id) || (userdb && userdb._id)) == message.author.id) return message.channel.send(Incorrect).catch((err) => { return; })
                let user = await db.getUser(message.author.id)
                let payuser = await db.getUser((usertag && usertag.id) || (userdb && userdb._id))
                const topoorembed = new Discord.MessageEmbed()
                    .setTitle("Your balance isn't large enought to execute this payment")
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setDescription(`Your current balance is \`${user.coins / 100}\`.`)
                    .setColor(15158332)
                    .setTimestamp();
                if (user.coins < parseInt(parseFloat(args[1]) * 100)) return message.channel.send(topoorembed).catch(err => { return; });
                if (((usertag && usertag.bot) || (payuser && payuser.bot) || (userdb && userdb.bot)) == true) return message.reply("Bots can't use Joins+.").catch(err => { return; })
                let awaitable = []
                awaitable.push(db.User.updateOne({
                    _id: user._id
                }, {
                    $inc: {
                        coins: -parseInt(parseFloat(args[1]) * 100)
                    }
                }).exec())
                awaitable.push(db.User.updateOne({
                    _id: payuser._id
                }, {
                    $inc: {
                        coins: +parseInt(parseFloat(args[1]) * 100)
                    }
                }).exec())
                await Promise.all(awaitable)
                payuser = await db.getUser((usertag && usertag.id) || (userdb && userdb._id));
                user = await db.getUser(message.author.id);
                /*const payedembed = new Discord.MessageEmbed()
                    .setTitle(`➡️ Paid ${parseInt(parseFloat(args[1]) * 100) / 100} coin${parseInt(parseFloat(args[1]) * 100) / 100 == 1 ? '' : 's'} ⬅️`)
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setDescription(`💸 **Your balance:** \`${user.coins / 100}\`\n💸 **Paid users balance:** \`${(payuser.coins) / 100}\`\n[*(click here for support)*](${process.env.SUPPORT_LINK})`)
                    .setColor(3066993)
                    .setTimestamp();
                    console.log(usertag)*/
                let payedembed = new Discord.MessageEmbed()
                    .setTitle(`Successfully sent ${parseInt(parseFloat(args[1]) * 100) / 100} coin${parseInt(parseFloat(args[1]) * 100) / 100 == 1 ? "" : "s"} to ${payuser.username || payuser._id}`)
                    .setColor(3066993)
                    .addField(`${payuser.username || payuser._id}`, `\`${payuser.coins / 100}\`🪙`, true)
                    .addField(`${user.username || user._id}`, `\`${user.coins / 100}\`🪙`, true)
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setTimestamp()
                await db.User.updateOne({
                    _id: user._id
                }, {
                    $push: {
                        history: `2.1.${payuser._id}.${parseInt(parseFloat(args[1]) * 100) / 100}`
                    }
                })
                await db.User.updateOne({
                    _id: payuser._id
                }, {
                    $push: {
                        history: `2.2.${user._id}.${parseInt(parseFloat(args[1]) * 100) / 100}`
                    }
                })
                message.channel.send(payedembed).catch(err => { return; });

            } else {
                message.channel.send(Incorrect).catch(err => { return; })
            }
        } else {
            message.channel.send(Incorrect).catch(err => { return; })
        }
    }
}