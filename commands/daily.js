const Discord = require("discord.js")
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
const db = require('../db')
dayjs.extend(relativeTime)

module.exports = {
    name: 'daily',
    description: 'Gives Daily Coins',
    cooldown: 3,
    /**
     * @param {Discord.Message} message
     */
    async execute(message, args, client) {
        // var sentembed = new Discord.MessageEmbed()
        // .setTitle("Sent. Check your DMs")
        // .setAuthor(message.author.username, message.author.displayAvatarURL())
        // .setDescription(`Got no message? Try manual [(click here)](${process.env.SUPPORT_LINK})`)
        // .setThumbnail("https://cdn.discordapp.com/avatars/810481979866480670/c40155d12d84fd1a87ecb38acee24913.webp?size=128")
        // .setColor(9807270)
        // .setTimestamp();
        // message.channel.send(sentembed).catch((err) => {return;})
        // message.author.send("**Official Joins+ Support:** "+process.env.SUPPORT_LINK).catch((err) => {return;})
        function msToTime(ms) {
            days = Math.floor(ms / 86400000); // 24*60*60*1000
            daysms = ms % 86400000; // 24*60*60*1000
            hours = Math.floor(daysms / 3600000); // 60*60*1000
            hoursms = ms % 3600000; // 60*60*1000
            minutes = Math.floor(hoursms / 60000); // 60*1000
            minutesms = ms % 60000; // 60*1000
            sec = Math.floor(minutesms / 1000);
            let str = "";
            if (days) str = str + days + "d ";
            if (hours) str = str + hours + "h ";
            if (minutes) str = str + minutes + "m ";
            if (sec) str = str + sec + "s";
            return str;
        }

        const datum = Date.now()
        let user = await db.getUser(message.author.id)
        if (user.daily.lastClaim < datum) {
            user.daily.lastClaim = datum + 86400000;
            user.coins += 300;
            await user.save()
            const coinsembed = new Discord.MessageEmbed()
                .setTitle("Claimed daily coins!")
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setDescription(`**You claimed 3 coins.**\nYour current balance is \`${user.coins / 100}\``)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(9807270)
                .setTimestamp();
            message.channel.send(coinsembed).catch(err => { return; })
        } else {
            const oncooldownembed = new Discord.MessageEmbed()
                .setTitle("ERROR!")
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setDescription(`You are still on cooldown!\n\`${msToTime(user.daily.lastClaim - datum)}\`\n[(click here for support)](${process.env.SUPPORT_LINK})`)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(15158332)
                .setTimestamp();
            message.channel.send(oncooldownembed).catch(err => { return; })
        }
    },
};