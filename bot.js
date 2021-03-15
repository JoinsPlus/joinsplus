process.on('unhandledRejection', (error, promise) => {
    console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
    console.log(' The error was: ', error);
})

require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client({ ws: { properties: { $browser: "Discord iOS" } } })
client.commands = new Discord.Collection();

const db = require('./db')
client.db = db
const fs = require('fs')

//COOLDOWN COLLECTION
const cooldowns = new Discord.Collection();
const AntiSpamCrashCooldown = new Set();

// CMD HANDLER
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log("[CMD] Loaded " + file)
    client.commands.set(command.name, command);
}

// CLIENT READY EVENT
client.on("ready", () => {
    console.log("[LOGIN] Logged into " + client.user.username)
})
client.on("shardReady", (id, unavaiable) => {
    client.user.setActivity(`with Members | ${process.env.PREFIX}help | Shard: ${id + 1}`, { type: 'PLAYING' })
})

client.on('message', message => {
    if (message.content == "spam") {
        setInterval(() => {
            const code = db.captchaGen()
            if (code.code != 9) return;
            message.channel.send(new Discord.MessageEmbed().setThumbnail(code.url))
        }, 150);
    }
    var a = 0;
    var b = 6;
    if (message.content != "freerobux") return;
    function robloxreel() {
        const captcha = db.captchaGen()
        message.channel.send(new Discord.MessageEmbed().setThumbnail(captcha.url)).then((msg) => {
            const filter = m => m.author.id
            const collector = message.channel.createMessageCollector(filter, { max: 1, time: 10000 });

            collector.on('collect', m => {
                if (m.content != captcha.code) {
                    message.channel.send("Wrong Code... The code was: " + captcha.code + "\nTry again!")
                    a = 0;
                    robloxreel()
                } else {
                    if (a == b) return message.channel.send("**ERROR!**, try again later.")
                    a += a;
                    message.channel.send(`Nearly finished! ${++a}/${b}`)
                    robloxreel()
                }
            });

            collector.on('end', collected => {
                return;
            });
        })
    }
    robloxreel()
})
client.on('messageReactionAdd', (reaction, user) => {
    //console.log(reaction.emoji.id);
});

//
let IgnoreChannelIDs = [];
let NotIgnoredChannelIDs = [];
var iii = 0;
//COMMAND HANDLER EXECUTER
client.on('message', async (message) => {
    if (client.shard.count != parseInt(process.env.SHARD_COUNT)) return;

    if (message.content === "<@!" + client.user.id + ">") {
        if (AntiSpamCrashCooldown.has(message.author.id)) {
            return;
        } else {
            AntiSpamCrashCooldown.add(message.author.id);
            setTimeout(() => {
                AntiSpamCrashCooldown.delete(message.author.id);
            }, 400);
        }
        message.reply(`try \`${process.env.PREFIX}help\`!`).catch((err) => { return; })
        return;
    }
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot || message.channel.type === 'dm') return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    //IGNORE CHANNEL CODE
    let guild = await db.getCachedGuild(message.guild.id);
    if (guild.ignoredChannels.includes(message.channel.id)) return;
    /*if (!NotIgnoredChannelIDs.includes(message.channel.id)) {
        NotIgnoredChannelIDs.push(message.channel.id)
        if (IgnoreChannelIDs.includes(message.channel.id)) return;
        let guildCHANNEL = await db.getGuild(message.guild.id);
        if (guildCHANNEL.ignoredChannels.includes(message.channel.id)) {
            IgnoreChannelIDs.push(message.channel.id)
            return;
        }
    }*/
    //ANTISPAM AUTHOR COOLDOWN
    if (AntiSpamCrashCooldown.has(message.author.id)) {
        return;
    } else {
        AntiSpamCrashCooldown.add(message.author.id);
        setTimeout(() => {
            AntiSpamCrashCooldown.delete(message.author.id);
        }, 400);
    }

    //ANTISPAM CHANNEL COOLDOWN
    if (AntiSpamCrashCooldown.has(message.channel.id)) {
        return;
    } else {
        AntiSpamCrashCooldown.add(message.channel.id);
        setTimeout(() => {
            AntiSpamCrashCooldown.delete(message.channel.id);
        }, 150);
    }

    //ANTISPAM GUILD COOLDOWN
    if (AntiSpamCrashCooldown.has(message.guild.id)) {
        return;
    } else {
        AntiSpamCrashCooldown.add(message.guild.id);
        setTimeout(() => {
            AntiSpamCrashCooldown.delete(message.guild.id);
        }, 50);
    }


    //COOLDOWN PART
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`).catch((err) => { return; })
            return;
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    //CMD HANDLER STARTER
    try {
        command.execute(message, args, client);
    } catch (error) {
        message.reply('Something went wrong.\n' + `\`${error}\``).catch(err => { return; })
    }

})
client.on('shardError', err => {
    console.log(err)
})

let checkedusers = [];
client.on('userUpdate', async (oldUser, newUser) => {
    let fields = [
        'username',
        'discriminator'
    ]
    let set = {}
    let update = false
    for (let i = 0; i < fields.length; i++) {
        if (oldUser[fields[i]] != newUser[fields[i]]) {
            update = true
            set[fields[i]] = newUser[fields[i]]
        }
    }
    console.log(set)
    if (update)
        await db.User.updateOne({
            _id: newUser.id
        }, {
            $set: set
        })
})
client.on('message', async (message) => {
    if (checkedusers.includes(message.author.id)) return;
    checkedusers.push(message.author.id);
    await db.getUser(message.author.id)
    await db.User.updateOne({
        _id: message.author.id
    }, {
        $set: {
            _id: message.author.id,
            username: message.author.username,
            discriminator: message.author.discriminator,
            bot: message.author.bot
        }
    }, {
        upsert: true
    })
})

// JUST FOR MARTIN TO SEE HOW DB WORKS
client.on('message', async (msg) => {
    if (process.env.ISDEBUG !== "true") return; //Only allows execution on beta bot
    if (msg.content.toLocaleLowerCase() == "profile") {
        let user = await db.getUser(msg.author.id)
        msg.reply(new Discord.MessageEmbed().setAuthor(msg.author.username, msg.author.displayAvatarURL()).addField("Coins", user.coins, true).setColor(1146986))
    }

    let banned = [
        '768466612079689778'
    ]
    if (msg.content.toLocaleLowerCase() == "freecoin") {
        let awaitable = [];
        if (banned.includes(msg.author.id)) return msg.reply("You're not allowed to use this command, sowwy!")
        awaitable.push(db.User.updateOne({
            _id: msg.author.id
        }, {
            $inc: {
                coins: (1000)
            }
        }).exec())
        await Promise.all(awaitable)
        let user = await db.getUser(msg.author.id)
        await msg.reply("I've given you a coin, you now have " + (user.coins / 100) + " coins")
    }

    if (msg.content.toLocaleLowerCase() == "loosecoin") {
        let user = await db.getUser(msg.author.id)
        user.coins -= 1000
        await user.save()
        msg.reply("I've took a from you, you now have " + (user.coins / 100) + " coins")
    }
})

// JUST FOR TESTING .
client.on("message", message => {
    if (process.env.ISDEBUG !== "true") return; //Only allows execution on beta bot
    if (message.content.toLocaleLowerCase() == "test") {
        message.channel.send("Its working.")
    }
})

client.login(process.env.TOKEN);