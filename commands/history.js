const Discord = require("discord.js");
const db = require("../db")
module.exports = {
    name: 'history',
    description: 'history cmd',
    cooldown: 1,
    /**
     * @param {Discord.Message} message
     * @param {String[]} args
     * @param {Discord.Client} client
     */
    async execute(message, args, client) {
        function errorembed(issue) {
            const errormbed = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setTitle(" ⠀  ⠀  ⠀  ⠀  ⠀ ERROR! ⠀  ⠀  ⠀  ⠀  ⠀ ")
                .setDescription(`\`\`\`${issue}\`\`\``)
                .setColor(9807270)
                .setTimestamp();
            return message.channel.send(errormbed).catch((err) => { return; })
        }
        async function noargs(message) {
            let user = await db.getUser(message.author.id)
            let historyembed = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setColor(9807270)
                .setTimestamp();
            let history = user.history.toObject();
            if (history.length < 8) {
                historyembed.setTitle(`Last ${history.length} transactions`)
                historyembed.setDescription("```\n" + (history.slice(history.length - 8, history.length).reverse().join('\n') || "No history yet!") + "```")
            } else {
                historyembed.setTitle(`Last 8 transactions`)
                historyembed.setFooter(`All transactions: ${history.length}`)
                historyembed.setDescription("```\n" + (history.slice(history.length - 8, history.length).reverse().join('\n') || "No history yet!") + "```")
            }
            return message.channel.send(historyembed).catch((err) => { return; })
        }
        if (!args[0]) {
            noargs(message);
        } else if (args[0]) {
            if (isNaN(args[0])) return errorembed(`${args[0]} is not a Number.`);
            if (args[0].length > 5) return errorembed(`${args[0]} can only be 5 long.`)
            if (parseInt(args[0]) > 9999) return errorembed(`${args[0]} :/\nThats a bit to big...`)
            let user = await db.getUser(message.author.id)
            let history = user.history.toObject();
            if (parseInt((history.length / 8) + 1) < parseInt(args[0])) return errorembed(`This page doens\'t exist.\nLast page: ${parseInt((history.length / 8) + 1)}`)
            function sort(histories, page) {
                if ((histories.length - (8 * page)) < 0) {
                    return histories.slice(0, history.length - (8 * page) + 8).reverse()
                }
                return histories.slice((histories.length - (8 * page)), history.length - (8 * page) + 8).reverse()
            }
            let historyembedx = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setColor(9807270)
                .setTimestamp();
            historyembedx.setTitle(`Page: ${parseInt(args[0])}`)
            historyembedx.setFooter(`All transactions: ${history.length} | Page: ${parseInt(args[0])}/${parseInt((history.length / 8) + 1)}`)
            historyembedx.setDescription("```\n" + (sort(history, parseInt(args[0])).join("\n") || "No history yet!") + "```")
            message.channel.send(historyembedx)
        }
    }
}