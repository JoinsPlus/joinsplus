const Discord = require("discord.js");
const { errorMonitor } = require("node-cache");
const db = require("../db")
module.exports = {
    name: 'settings',
    description: 'Sets Guild settings',
    cooldown: 2,
    /**
     * @param {Discord.Message} message
     * @param {String[]} args
     * @param {Discord.Client} client
     */
    async execute(message, args, client) {
        const errorembed = new Discord.MessageEmbed().setTitle("ERROR!").setColor(15158332).setTimestamp();
        if (!args[0]) {
            errorembed.setDescription(`**Missing argument!**\nAvaiable arguments:\n \`description/ignorechannel\``)
            return message.channel.send(errorembed).catch((err) => { return; })
        }
        if (args[0].toLowerCase() == "description") {
            if (!args[1]) {
                errorembed.setDescription(`**Missing description!** \n*Example: ${process.env.PREFIX}settings description This is a guild made with love!*`)
                return message.channel.send(errorembed).catch((err => { return; }))
            }
            if (args[1]) {
                var data = args.slice(1).join(' ')
                if (data.length > 500) {
                    errorembed.setDescription(`**Description is not allowed to be longer than 500 characters.**`);
                    return message.channel.send(errorembed).catch((err) => { return; })
                }
                let guild = await db.getGuild(message.guild.id)
                await db.Guild.updateOne({
                    _id: message.guild.id
                }, {
                    $set: {
                        description: data.toString()
                    }
                })
                guild = await db.getGuild(message.guild.id)
                message.channel.send(new Discord.MessageEmbed().setTitle("Changed description.").setDescription(`New description: \`${guild.description}\``).setColor(3066993)).catch((err) => { return; })
            }
        } else if (args[0].toLowerCase() == "ignorechannel") {
            if (!args[1]) {
                errorembed.setDescription(`**Missing argument!**\nAvaiable arguments:\n \`add/list/remove\``)
                return message.channel.send(errorembed).catch((err) => { return; })
            }
            if (args[1].toLowerCase() == "add") {
                if (!args[2]) {
                    errorembed.setDescription(`**missing ID!**\n\`${process.env.PREFIX}settings ignorechannel add <CHANNEL-ID>\` \n*(If you don't know how to get the channel ID just google it.)*`)
                    return message.channel.send(errorembed).catch((err) => { return; })
                }
                args[2] = args[2].replace("<", "").replace("#", "").replace(">", "")
                if (isNaN(args[2])) {
                    errorembed.setDescription(`**Channel IDs are only numbers.**\n*(If you don't know how to get the channel id just google it.)`)
                    return message.channel.send(errorembed).catch((err) => { return; })
                }
                if (args[2].length > 19) {
                    errorembed.setDescription(`**Wrong usage!**\n\`${process.env.PREFIX}settings ignorechannel add <ID>\`\n*(If you don't know how to get the channel ID just google it.)*`)
                    return message.channel.send(errorembed).catch((err) => { return; })
                }
                let channel = message.guild.channels.resolve(args[2])
                if (!channel) {
                    errorembed.setDescription(`**Can't find channel**\n\`${args[2]}\``)
                    return message.channel.send(errorembed).catch((err) => { return; })
                }
                if (channel.type != "text" && channel.type != "news") {
                    errorembed.setDescription(`**The channel you selected is not a text channel!**\n\`${args[2]}\``)
                    return message.channel.send(errorembed).catch((err) => { return; })
                }
                let guild = await db.getGuild(message.guild.id)
                if (guild.ignoredChannels.includes(args[2])) {
                    errorembed.setDescription(`**This channel is already ignored!**\n<#${args[2]}>`)
                    return message.channel.send(errorembed).catch((err) => { return; })
                }
                guild.ignoredChannels.push(args[2])
                await guild.save()
                client.db.purgeCachedGuild(guild._id)
                message.channel.send(new Discord.MessageEmbed().setTitle("Added ignorechannel.").setDescription(`Added: \`${args[2]}\``).setColor(3066993)).catch((err) => { return; })
            } else if (args[1].toLowerCase() == "list") {
                let guild = await db.getGuild(message.guild.id)
                message.channel.send(`**Ignored channel IDs:**\n` + guild.ignoredChannels.map((channelID) => {
                    let channel = message.guild.channels.resolve(channelID)
                    if (channel) return `<#${channel.id}>`
                    return `\`${channelID}\``
                }).join("\n"))
                //message.channel.send(idsinfo).catch((err) => {return;})
            } else if (args[1].toLowerCase() == "remove") {
                if (!args[2]) if (!args[2]) {
                    errorembed.setDescription(`**missing ID!**\n\`${process.env.PREFIX}settings ignorechannel remove <CHANNEL-ID>\` \n*(If you don't know how to get the channel ID just google it.)*`)
                    return message.channel.send(errorembed).catch((err) => { return; })
                }
                args[2] = args[2].replace("<", "").replace("#", "").replace(">", "")
                if (isNaN(args[2])) {
                    errorembed.setDescription(`**Channel IDs are only numbers.**\n*(If you don't know how to get the channel id just google it.)`)
                    return message.channel.send(errorembed).catch((err) => { return; })
                }
                if (args[2].length > 19) {
                    errorembed.setDescription(`**Wrong usage!**\n\`${process.env.PREFIX}settings ignorechannel add <ID>\`\n*(If you don't know how to get the channel ID just google it.)*`)
                    return message.channel.send(errorembed).catch((err) => { return; })
                }
                let guild = await db.getGuild(message.guild.id)
                if (!guild.ignoredChannels.includes(args[2])) {
                    errorembed.setDescription(`**This channel is already ignored!**\n<#${args[2]}>`)
                    return message.channel.send(errorembed).catch((err) => { return; })
                }
                await db.Guild.updateOne({
                    _id: message.guild.id
                }, {
                    $pull: {
                        ignoredChannels: args[2]
                    }
                })
                await guild.save()
                client.db.purgeCachedGuild(guild._id)
                message.channel.send(new Discord.MessageEmbed().setTitle("Removed ignore channel.").setDescription(`Removed: \`${args[2]}\``).setColor(3066993)).catch((err) => { return; })
            }
        } else {
            errorembed.setDescription(`**Missing argument!**\nAvaiable arguments:\n \`description/ignorechannel\``)
            return message.channel.send(errorembed).catch((err) => { return; })
        }
    },
};
