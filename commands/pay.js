const Discord = require("discord.js");
const db = require("../db")
module.exports = {
    name: 'pay',
    description: 'pay cmd',
    cooldown: 3,
    async execute(message, args) {
        const usertag = message.mentions.users.first();

        if (args[0] && usertag) {

            if (!args[1]) return message.channel.send(`Wrong usage!\n${process.env.PREFIX}pay <MEMBER> <AMOUNT>`).catch(err => { return; });
            if (!isNaN(args[1])) {

                if (args[1] < 1) return message.channel.send("You can't pay amounts less than 1 coin.").catch(err => { return; });
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
                Promise.all(awaitable)
                payuser = await db.getUser(usertag.id);
                user = await db.getUser(message.author.id);
                const payedembed = new Discord.MessageEmbed()
                    .setTitle(`Paid ${parseInt(parseFloat(args[1]) * 100) / 100} coin${parseInt(parseFloat(args[1]) * 100) / 100 == 1 ? '' : 's'}.`)
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setDescription(`Your balance: \`${user.coins / 100}\`\nPaid users balance: \`${payuser.coins / 100}\`\n[*(click here for support)*](${process.env.SUPPORT_LINK})`)
                    .setColor(3066993)
                    .setTimestamp();
                message.channel.send(payedembed).catch(err => { return; });

            } else {
                message.channel.send(`Incorrect usage!\n${process.env.PREFIX}pay <@MEMBER> <AMOUNT>`).catch(err => { return; })
            }
        } else {
            message.channel.send(`Incorrect usage!\n${process.env.PREFIX}pay <@MEMBER> <AMOUNT>`).catch(err => { return; })
        }
    },
};