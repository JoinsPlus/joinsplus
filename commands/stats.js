const Discord = require("discord.js");
const db = require("../db")
const os = require('os')
let info = {
    me: {
        name: "Martin",
        age: "15 idk",
        city: "Gaytown",
        lmao: "Yea lmao"
    }
}
module.exports = {
    name: 'stats',
    description: 'shows bots stats',
    cooldown: 10,
    /**
     * @param {Discord.Message} message
     * @param {Discord.Client} client
     */
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
        message.channel.send(checking).then(async (msg) => {
            const statsinfo = new Discord.MessageEmbed()
                .setTitle("↔ Bot statistics ↔")
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`[join support](${process.env.SUPPORT_LINK}) **|** [bot invite](${process.env.INVITE_LINK})`)
                .addField("Shard-ID", `\`${message.guild.shardID + 1}/${client.shard.count}\``)
                .addField(":books: Library: :books: ", `\`Discord.js - V12\``)
                .setColor(9807270)
                .setTimestamp();

            const ShardGuilds = await client.shard.fetchClientValues('guilds.cache.size');
            const ShardChannels = await client.shard.fetchClientValues('channels.cache.size');
            const ShardMembers = await client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)')
            const totalGuilds = ShardGuilds.reduce((acc, guildCount) => acc + guildCount, 0);
            const totalMembers = ShardMembers.reduce((acc, memberCount) => acc + memberCount, 0);
            const totalChannels = ShardChannels.reduce((acc, memberCount) => acc + memberCount, 0);
            statsinfo.addField("<:ram:817880611049046086> Node Ram Usage:", `\`${Math.round(((os.totalmem() - os.freemem()) / 1048576))}MiB\``, true)
            statsinfo.addField("Shard Ram Usage: <:ram:817880611049046086>", `\`${Math.round((process.memoryUsage().heapUsed / 1048576))}MiB\``, true)
            statsinfo.addField(" ⠀ ", " ⠀ ", false)
            statsinfo.addField("<:server:817881613797949452> All-Servers:", `\`${totalGuilds}\``, true)
                .addField("Shard-Servers: <:server:817881613797949452>", `\`${client.guilds.cache.size}\``, true)

            statsinfo.addField(" ⠀ ", " ⠀ ", false)
            statsinfo.addField("<:joins:817882836882817076> All-Users:", `\`${totalMembers}\``, true)
                .addField("Shard-Users: <:joins:817882836882817076>", `\`${client.guilds.cache.map(s => s.memberCount).reduce((a, b) => a + b)}\``, true)

            statsinfo.addField(" ⠀ ", " ⠀ ", false)
            statsinfo.addField("<:channel:817883067112095786> All-Channels:", `\`${totalChannels}\``, true)
                .addField("Shard-Channels: <:channel:817883067112095786>", `\`${client.channels.cache.size}\``, true)

            statsinfo.addField(" ⠀ ", " ⠀ ", false)
            statsinfo.addField("<:cpu:817881255432552489> CPU Usage: <:cpu:817881255432552489>", `\`${os.loadavg()[0].toString()}%\``, false)
                .addField(":green_circle: Shard-Uptime: :green_circle:", `\`${msToTime(client.uptime)}\``, false)

            const stopped = new Date();
            statsinfo.setFooter(`message took ${stopped - start}ms to send.`);
            msg.edit(statsinfo).catch((err) => { console.log("[STATS-ERROR] " + err) })
        }).catch((err) => { console.log("[STATS-ERROR] " + err); message.reply("Something went wrong.. Try again!").catch((err) => { return; }) })
    },
};

