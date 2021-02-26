const Discord = require("discord.js");
const db = require('../db')
module.exports = {
    name: 'orders',
    description: 'Shows Guilds current orders',
    cooldown: 5,
    /**
     * @param {Discord.Message} message
     */
    async execute(message, args, client) {
        message.channel.send(new Discord.MessageEmbed().setTitle("Counting orders...")).then(async (msg) => {
            const orders = await db.Order.countDocuments({
                guild: message.guild.id,
                $or: [
                    {
                        awarded: null
                    },
                    {
                        awarded: undefined
                    }
                ]
            });
            await msg.edit(new Discord.MessageEmbed().setTitle(message.guild.name).setThumbnail(message.guild.iconURL()).setDescription(`**This guild is currently awaiting **\`${orders}\`** orders!**`).setColor(9807270).setTimestamp()).catch((err) => { return; })
        }).catch((err) => { message.reply("Something went wrong...").catch((err) => { return; }); console.log("[ORDERS-CMD-ERR] " + err) })
    },
};