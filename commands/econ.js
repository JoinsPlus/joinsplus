const Discord = require('discord.js');
const allowed = [
    '743183263710969913',
    '706902380637192212'
]
const fs = require('fs')
const db = require('../db')
module.exports = {
    name: 'econ',
    description: 'Ignores Users CMD',
    cooldown: 0,
    /**
     * @param {Discord.Message} message
     * @param {String[]} args
     */
    async execute(message, args) {
        if (!allowed.includes(message.author.id)) return;
        if (allowed.includes(message.author.id)) {
            if (!args[0]) return message.reply("No args given! (set/show/add/remove/resetdaily/resethistory)").catch((err) => { return; })
            if (args[0].toLowerCase() == "set") {

                if (!args[1]) return message.reply(`ID missing! \`${process.env.PREFIX}econ set <ID> <COINS>\``).catch(err => { return; });
                if (isNaN(args[1])) return message.reply(`ID missing! \`${process.env.PREFIX}econ set <ID> <COINS>\``).catch(err => { return; });
                if (!args[2]) return message.reply(`Coins missing! \`${process.env.PREFIX}econ set <ID> <COINS>\``).catch(err => { return; });
                if (isNaN(args[2])) return message.reply(`Coins missing! \`${process.env.PREFIX}econ set <ID> <COINS>\``).catch(err => { return; });
                if (args[2] > 2147483646) return message.reply(`This number is too big. \`${process.env.PREFIX}econ set <ID> <COINS>\``).catch((err) => { return; })
                let user = await db.getUser(args[1])
                let coins = parseInt(parseFloat(args[2]) * 100)
                user.coins = coins;
                await user.save()
                await db.User.updateOne({
                    _id: user._id
                }, {
                    $push: {
                        history: `[ADMIN] Admin set your Coins to ${coins / 100}.`
                    }
                })
                message.reply("User has now " + (user.coins / 100) + " coins.").catch((err) => { return; })
            } else if (args[0].toLowerCase() == "show") {

                if (!args[1]) return message.reply(`ID missing! \`${process.env.PREFIX}econ show <ID>\``).catch(err => { return; });
                if (isNaN(args[1])) return message.reply(`ID missing \`${process.env.PREFIX}econ show <ID>\``).catch(err => { return; })
                let user = await db.getUser(args[1])
                message.reply("User has " + (user.coins / 100) + " coins.").catch((err) => { return; })
            } else if (args[0].toLowerCase() == "add") {

                if (!args[1]) return message.reply(`ID missing! \`${process.env.PREFIX}econ add <ID> <COINS>\``).catch(err => { return; });
                if (isNaN(args[1])) return message.reply(`ID missing! \`${process.env.PREFIX}econ add <ID> <COINS>\``).catch(err => { return; });
                if (!args[2]) return message.reply(`Coins missing! \`${process.env.PREFIX}econ add <ID> <COINS>\``).catch(err => { return; });
                if (isNaN(args[2])) return message.reply(`Coins missing! \`${process.env.PREFIX}econ add <ID> <COINS>\``).catch(err => { return; });
                let user = await db.getUser(args[1])
                if ((user.coins + args[2]) > 2147483646) return message.reply(`This number is too big. (max ${(user.coins - 2147483646)}) \`${process.env.PREFIX}econ set <ID> <COINS>\``).catch((err) => { return; })
                user.coins += parseInt(parseFloat(args[2]) * 100);
                await user.save()
                await db.User.updateOne({
                    _id: user._id
                }, {
                    $push: {
                        history: `[ADMIN] Admin added ${parseInt(parseFloat(args[2]) * 100) / 100} Coins to you.`
                    }
                })
                message.reply("User has now " + (user.coins / 100) + " coins.").catch((err) => { return; })
            } else if (args[0].toLowerCase() == "remove") {

                if (!args[1]) return message.reply(`ID missing! \`${process.env.PREFIX}econ remove <ID> <COINS>\``).catch(err => { return; });
                if (isNaN(args[1])) return message.reply(`ID missing! \`${process.env.PREFIX}econ remove <ID> <COINS>\``).catch(err => { return; });
                if (!args[2]) return message.reply(`Coins missing! \`${process.env.PREFIX}econ remove <ID> <COINS>\``).catch(err => { return; });
                if (isNaN(args[2])) return message.reply(`Coins missing! \`${process.env.PREFIX}econ remove <ID> <COINS>\``).catch(err => { return; });
                let user = await db.getUser(args[1])
                user.coins -= parseInt(parseFloat(args[2]) * 100);
                await user.save()
                await db.User.updateOne({
                    _id: user._id
                }, {
                    $push: {
                        history: `[ADMIN] Admin removed ${parseInt(parseFloat(args[2]) * 100) / 100} Coins from you.`
                    }
                })
                message.reply("User has now " + (user.coins / 100) + " coins.").catch((err) => { return; })
            } else if (args[0].toLowerCase() == "resetdaily") {

                if (!args[1]) return message.reply(`ID missing! \`${process.env.PREFIX}econ resetdaily <ID>\``).catch(err => { return; });
                if (isNaN(args[1])) return message.reply(`ID missing \`${process.env.PREFIX}econ resetdaily <ID>\``).catch(err => { return; })
                let user = await db.getUser(args[1])
                user.daily.lastClaim = 0;
                await user.save()
                message.reply("Reseted Users daily cooldown!").catch((err) => { return; })
            } else if (args[0] == "resethistory") {
                if (!args[1]) return message.reply(`ID missing! \`${process.env.PREFIX}econ resetdaily <ID>\``).catch(err => { return; });
                if (isNaN(args[1])) return message.reply(`ID missing \`${process.env.PREFIX}econ resetdaily <ID>\``).catch(err => { return; })
                let user = await db.getUser(args[1])
                user.history = ["[ADMIN] History cleared."]
                await user.save()
                message.reply("Reseted Users history.").catch((err) => { return; })
            } else if (args[0] == "history") {
                if (!args[1]) return message.reply(`ID missing! \`${process.env.PREFIX}econ resetdaily <ID>\``).catch(err => { return; });
                if (isNaN(args[1])) return message.reply(`ID missing \`${process.env.PREFIX}econ resetdaily <ID>\``).catch(err => { return; })
                let user = await db.getUser(args[1])
                if (!fs.existsSync('./temp')) fs.mkdirSync('./temp')
                if (fs.existsSync('./temp/history_' + user._id + '.json')) {
                    return message.reply("Busy")
                }
                fs.writeFile('./temp/history_' + user._id + '.json', JSON.stringify(user.history.toObject(), null, 2), (err) => {
                    if (err) return message.reply("Unable to write file")
                    let attachment = new Discord.MessageAttachment('./temp/history_' + user._id + '.json');
                    message.reply(attachment).catch((err) => { return; }).finally(() => {
                        fs.rm('./temp/history_' + user._id + '.json', (err) => { })
                    })
                })
            }
        }
    },
};
