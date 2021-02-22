const Discord = require("discord.js")
const db = require("../db")
module.exports = {
    name: 'settings',
    description: 'Sets Guild settings',
    cooldown: 5,
    async execute(message, args, client) {
        if (!args[0]) return message.reply("missing argument! (description/ignorechannel)").catch((err) => { return; })
        if (args[0].toLowerCase() == "description") {
            if (!args[1]) return message.reply(`missing description! (example: ${process.env.PREFIX}settings description This is a guild made with love!`).catch((err) => { return; })
            if (args[1]) {
                var data = args.slice(1).join(' ')
                if (data.length > 500) return message.reply("description is not allowed to be longer than 500 characters.")
                let guild = await db.getGuild(message.guild.id)
                await db.Guild.updateOne({
                    _id: message.guild.id
                },
                    {
                        $set: {
                                description: data.toString()
                        }
                    })
                guild = await db.getGuild(message.guild.id)
                message.channel.send(new Discord.MessageEmbed().setTitle("Changed description.").setDescription(`New description: \`${guild.description}\``).setColor(3066993)).catch((err) => { return; })
            }
        } else if (args[0].toLowerCase() == "ignorechannel") {
            if (!args[1]) return message.reply(`missing information! (add/list/delete)`)
            if (args[1].toLowerCase() == "add") {
                if (!args[2]) return message.reply(`missing id! \`${process.env.PREFIX}settings ignorechannel add <CHANNEL-ID>\` *(If you don't know how to get the channel id just google it.)*`).catch((err) => { return; })
                if (isNaN(args[2])) return message.reply("ids are only numbers.").catch((err) => { return; })
                let guild = await db.getGuild(message.guild.id)
                await db.Guild.updateOne({
                    _id: message.guild.id
                },
                    {
                        $push: {
                            ignoredchannel: args[2]
                        }
                    })
                guild = await db.getGuild(message.guild.id)
                message.channel.send(new Discord.MessageEmbed().setTitle("Added ignore channel.").setDescription(`Added: \`${guild.ignoredchannel}\``).setColor(3066993)).catch((err) => { return; })
            }
        }
    },
};