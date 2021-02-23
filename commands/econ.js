const Discord = require('discord.js');
const allowed = [
    '743183263710969913',
    '706902380637192212'
]
const db = require('../db')
module.exports = {
    name: 'econ',
    description: 'Ignores Users CMD',
    cooldown: 0,
    async execute(message, args) {
        if (!allowed.includes(message.author.id)) return;
        if (allowed.includes(message.author.id)) {
            if (!args[0]) return message.reply("No args given! (set/show/add/remove/resetdaily)").catch((err) => { return; })
            if (args[0].toLowerCase() == "set") {
                if (!args[1]) return message.reply(`ID missing! \`${process.env.PREFIX}econ set <ID> <COINS>\``).catch(err => { return; });
                if (isNaN(args[1])) return message.reply(`ID missing! \`${process.env.PREFIX}econ set <ID> <COINS>\``).catch(err => { return; });
                if (!args[2]) return message.reply(`Coins missing! \`${process.env.PREFIX}econ set <ID> <COINS>\``).catch(err => { return; });
                if (isNaN(args[2])) return message.reply(`Coins missing! \`${process.env.PREFIX}econ set <ID> <COINS>\``).catch(err => { return; });
                if(args[2] > 2147483646) return message.reply(`This number is too big. \`${process.env.PREFIX}econ set <ID> <COINS>\``).catch((err) => {return;})
                let user = await db.getUser(args[1])
                user.coins = args[2];
                await user.save()
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
                if((user.coins+args[2]) > 2147483646) return message.reply(`This number is too big. (max ${(user.coins - 2147483646)}) \`${process.env.PREFIX}econ set <ID> <COINS>\``).catch((err) => {return;})
                user.coins += args[2];
                await user.save()
                message.reply("User has now " + (user.coins / 100) + " coins.").catch((err) => { return; })
            } else if (args[0].toLowerCase() == "remove") {
                if (!args[1]) return message.reply(`ID missing! \`${process.env.PREFIX}econ remove <ID> <COINS>\``).catch(err => { return; });
                if (isNaN(args[1])) return message.reply(`ID missing! \`${process.env.PREFIX}econ remove <ID> <COINS>\``).catch(err => { return; });
                if (!args[2]) return message.reply(`Coins missing! \`${process.env.PREFIX}econ remove <ID> <COINS>\``).catch(err => { return; });
                if (isNaN(args[2])) return message.reply(`Coins missing! \`${process.env.PREFIX}econ remove <ID> <COINS>\``).catch(err => { return; });
                let user = await db.getUser(args[1])
                user.coins -= args[2];
                await user.save()
                message.reply("User has now " + (user.coins / 100) + " coins.").catch((err) => { return; })
            }else if(args[0].toLowerCase() == "resetdaily"){
                if (!args[1]) return message.reply(`ID missing! \`${process.env.PREFIX}econ resetdaily <ID>\``).catch(err => { return; });
                if (isNaN(args[1])) return message.reply(`ID missing \`${process.env.PREFIX}econ resetdaily <ID>\``).catch(err => { return; })
                let user = await db.getUser(args[1])
                user.daily.lastClaim = 0;
                await user.save()
                message.reply("Reseted Users daily cooldown!").catch((err) => { return; })
            }
        }
    },
};
