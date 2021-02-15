const Discord = require("discord.js")

module.exports = {
	name: 'ping',
	description: 'Ping!',
    cooldown: 5,
	async execute(message, args, client) {
		function msToTime(ms){
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
        const pingembed = new Discord.MessageEmbed()
        .setTitle("Ping")
        .setDescription(" ")
        .setColor(9807270)
        message.channel.send(pingembed).then((msg) => {
        const pingembed2 = new Discord.MessageEmbed()
        .setTitle("Ping")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(`Message Latency: ${msg.createdTimestamp - message.createdTimestamp}ms.\nWebsocket Latency: ${client.ws.ping}ms\nUptime: ${msToTime(client.uptime)}\n[(click here for support)](${process.env.SUPPORT_LINK})`)
        .setColor(9807270)
        .setTimestamp(); 
            msg.edit(pingembed2).catch((err) => {return;});
        }).catch((err) => {
            message.author.send(`there was an error trying to execute that command!\n\`${err}\``).catch((err) => {
                if(err) {
                    return;
                }
            })
        })
	},
};