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
            .setTitle("↔ Bot statistics ↔")
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`[join support](${process.env.SUPPORT_LINK}) **|** [bot invite](${process.env.INVITE_LINK})`)
            .addField(":books: Library: :books: ", `\`Discord.js - V12\``)
            .addField("<:ram:817880611049046086> Shard Ram Usage: <:ram:817880611049046086>", `\`${Math.round((process.memoryUsage().heapUsed / 1048576))}MiB\``)
            .addField("<:ram:817880611049046086> Total Ram Usage: <:ram:817880611049046086>", `\`${Math.round(((os.totalmem() - os.freemem()) / 1048576))}MiB\``)
            .addField("<:cpu:744423287185997876> CPU Usage: <:cpu:744423287185997876>", `\`${os.loadavg()[0].toString()}%\``)
            .addField(":green_circle: Uptime: :green_circle:", `\`${msToTime(client.uptime)}\``)
            .addField("<:server:817881613797949452> Servers: <:server:817881613797949452>", `\`${client.guilds.cache.size}\``)
            .addField("<:joins:817882836882817076> Users: <:joins:817882836882817076>", `\`${client.guilds.cache.map(s => s.memberCount).reduce((a, b) => a + b)}\``)
            .addField("<:channel:817883067112095786> Channels: <:channel:817883067112095786>", `\`${client.channels.cache.size}\``)
            .setColor(9807270)
            .setTimestamp();
            const stopped = new Date();
            statsinfo.setFooter(`message took ${stopped - start}ms to send.`);
            msg.edit(statsinfo).catch((err) => {console.log("[STATS-ERROR] "+err)})
        }).catch((err) => {console.log("[STATS-ERROR] "+err);message.reply("Something went wrong.. Try again!").catch((err) => {return;})})
    },
};

