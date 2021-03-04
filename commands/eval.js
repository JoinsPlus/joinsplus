const Discord = require('discord.js');
const allowed = [
    '743183263710969913',
    '706902380637192212'
]
const clean = text => {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
};
const hastebin = require("hastebin-gen")
const db = require('../db')
module.exports = {
    name: 'eval',
    description: 'Ignores Users CMD',
    async execute(message, args) {
        if (!allowed.includes(message.author.id)) return;
        if (allowed.includes(message.author.id)) {
            if (!args[0]) return message.channel.send("**Missing Code (args[0])**")
            try {
                var data = args.join(' ')
                message.delete().catch(err => { return; });
                console.log(`[EVAL] ${message.author.username} | ${message.author.id} | ${message.content}`)

                const msg = message
                const client = message.client
                
                let evaled = eval(data);
                if (typeof evaled !== "string") {
                    evaled = require("util").inspect(evaled);
                }
                if(clean(evaled).length > 2000){
                    message.channel.send("Smh... Response was too long!\n").catch((err) => {return;})
                    return;
                }
                if(evaled.includes(process.env.TOKEN)) return message.reply("Response includes secret values!")
                message.channel.send(clean(evaled), { code: "js" });
            } catch (error) {
                if (typeof error != "string") {
                    message.channel.send(clean(error), { code: "js" })
                    console.log(error)
                } else {
                    message.channel.send(error, { code: "js" })
                    console.log(error)
                }
            }
        }
    },
};