require('dotenv').config({
    path: './vars.env'
})
const Discord = require('discord.js')
const client = new Discord.Client()
client.commands = new Discord.Collection();

const db = require('./db')
const fs = require('fs')

//COOLDOWN COLLECTION
const cooldowns = new Discord.Collection();

// CMD HANDLER
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    console.log("[CMD] Loaded "+file)
	client.commands.set(command.name, command);
}


// CLIENT READY EVENT
client.on("ready", () => {
    console.log("[LOGIN] Logged into "+client.user.username)
    client.user.setActivity("with Members", { type: 'PLAYING' })
})

//COMMAND HANDLER EXECUTER
client.on('message', async (message) => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot || message.channel.type === 'dm') return;

	const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

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
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);    


    //CMD HANDLER STARTER
    try {
        command.execute(message, args, client);
    } catch (error) {
        message.reply('Something went wrong.\n'+`\`${error}\``).catch(err => {return;})
    }

})

// JUST FOR MARTIN TO SEE HOW DB WORKS
client.on('message', async (msg) => {
    if (process.env.ISDEBUG !== "true") return; //Only allows execution on beta bot
    if (msg.content.toLocaleLowerCase() == "profile") {
        let user = await db.getUser(msg.author.id)
        msg.reply(new Discord.MessageEmbed().setAuthor(msg.author.username, msg.author.displayAvatarURL()).addField("Coins", user.coins, true).setColor(1146986))
    }
    
    if (msg.content.toLocaleLowerCase() == "freecoin") {
        let user = await db.getUser(msg.author.id)
        user.coins += 1
        await user.save()
        msg.reply("I've given you a coin, you now have " + user.coins + " coins")
    }
    
    if (msg.content.toLocaleLowerCase() == "loosecoin") {
        let user = await db.getUser(msg.author.id)
        user.coins -= 1
        await user.save()
        msg.reply("I've took a from you, you now have " + user.coins + " coins")
    }
})

// JUST FOR TESTING
client.on("message", message => {
    if (process.env.ISDEBUG !== "true") return; //Only allows execution on beta bot
    if(message.content.toLocaleLowerCase() == "test"){
        message.channel.send("Its working.")
    }  
})

client.login(process.env.TOKEN);