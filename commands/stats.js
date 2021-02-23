const Discord = require("discord.js");
const db = require("../db")
const os = require('os')
module.exports = {
    name: 'stats',
    description: 'shows bots stats',
    cooldown: 10,
    async execute(message, args, client) {
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
    const start = new Date();
    const checking = new Discord.MessageEmbed()
    .setTitle("Checking...").setColor(9807270);
        message.channel.send(checking).then((msg) => {
            const statsinfo = new Discord.MessageEmbed()
            .setTitle("Bot statistics")
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`❗ **Library:** \`Discord.js - V12\`\n❕ **Shard Ram Usage:** \`${Math.round((process.memoryUsage().heapUsed / 1048576))} / ${Math.round((parseInt(process.env.MAXMEM) || os.totalmem()) / 1048576)}MiB\`\n❗ **Total Ram Usage** \`${Math.round(((os.totalmem() - os.freemem()) / 1048576))}MiB/${Math.round(os.totalmem() / 1048576)}MiB\`\n❕ **CPU Usage:** \`${os.loadavg()[0].toString()}%\`\n❗ **Uptime:** \`${msToTime(client.uptime)}\`\n❕ **Servers:** \`${client.guilds.cache.size}\`\n❗ **Users:** \`${client.guilds.cache.map(s => s.memberCount).reduce((a, b) => a + b)}\`\n❕ **Channels:** \`${client.channels.cache.size}\`\n\n[(click here for support)](${process.env.SUPPORT_LINK}) [(click here to invite the bot)](${process.env.INVITE_LINK})`)
            .setColor(9807270)
            .setTimestamp();
            const stopped = new Date();
            statsinfo.setFooter(`message took ${stopped - start}ms to send.`);
            msg.edit(statsinfo).catch((err) => {console.log("[STATS-ERROR] "+err)})
        }).catch((err) => {console.log("[STATS-ERROR] "+err);message.reply("Something went wrong.. Try again!").catch((err) => {return;})})
    },
};

