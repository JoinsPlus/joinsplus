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
        const Incorrect = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle("ERROR!")
            .setColor(15158332)
            .setDescription(`**Incorrect usage!**\n❕ \`${process.env.PREFIX}pay <MEMBER> <AMOUNT>\``);
        if (args[0] && usertag) {

            if (!args[1]) return message.channel.send(Incorrect).catch(err => { return; });
            if (!isNaN(args[1])) {

                if (args[1] < 1) return message.channel.send(new Discord.MessageEmbed().setTitle("ERROR!").setDescription(`**Incorrect usage!**\nYou can't pay less than 1 coin.`).setAuthor(message.author.username, message.author.displayAvatarURL()).setThumbnail(client.user.displayAvatarURL()).setColor(15158332)).catch(err => { return; });
                if (usertag.id == message.author.id) return message.channel.send(Incorrect).catch((err) => { return; })
                let user = await db.getUser(message.author.id)
                let payuser = await db.getUser(usertag.id)
                const topoorembed = new Discord.MessageEmbed()
                    .setTitle("Your balance isn't large enought to execute this payment")
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setDescription(`Your current balance is \`${user.coins / 100}\`.`)
                    .setColor(15158332)
                    .setTimestamp();
                if (user.coins < parseInt(parseFloat(args[1]) * 100)) return message.channel.send(topoorembed).catch(err => { return; });
                if (usertag.bot) return message.reply("Bots can't use Joins+.").catch(err => { return; })
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
                payuser = await db.getUser(usertag.id);
                user = await db.getUser(message.author.id);
                /*const payedembed = new Discord.MessageEmbed()
                    .setTitle(`➡️ Paid ${parseInt(parseFloat(args[1]) * 100) / 100} coin${parseInt(parseFloat(args[1]) * 100) / 100 == 1 ? '' : 's'} ⬅️`)
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setDescription(`💸 **Your balance:** \`${user.coins / 100}\`\n💸 **Paid users balance:** \`${(payuser.coins) / 100}\`\n[*(click here for support)*](${process.env.SUPPORT_LINK})`)
                    .setColor(3066993)
                    .setTimestamp();
                    console.log(usertag)*/
                let payedembed = new Discord.MessageEmbed()
                    .setTitle(`Successfully sent ${parseInt(parseFloat(args[1]) * 100) / 100} coin${parseInt(parseFloat(args[1]) * 100) / 100 == 1 ? "" : "s"} to ${message.guild.members.resolve(usertag.id) ? message.guild.members.resolve(usertag.id).displayName : client.users.resolve(usertag.id).username}`)
                    .setColor(3066993)
                    .addField(`${message.guild.members.resolve(usertag.id) ? message.guild.members.resolve(usertag.id).displayName : client.users.resolve(usertag.id).username}`, `\`${payuser.coins / 100}\`🪙`, true)
                    .addField(`${message.guild.members.resolve(message.author.id) ? message.guild.members.resolve(message.author.id).displayName : client.users.resolve(message.author.id).username}`, `\`${user.coins / 100}\`🪙`, true)
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setTimestamp()
                message.channel.send(payedembed).catch(err => { return; });

            } else {
                message.channel.send(Incorrect).catch(err => { return; })
            }
        }else {
            message.channel.send(Incorrect).catch(err => { return; })
        }
    }
}