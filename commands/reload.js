const fs = require('fs')
const allowed = [
	'743183263710969913',
	'706902380637192212'
]

module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	execute(message, args) {
        if(!allowed.includes(message.author.id)) return;
        if(!args[0]) return message.channel.send("**CMD Name is missing!**")
        const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`**There is no CMD with Name \`${commandName}\`, ${message.author}!**`);
		}

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`**Command \`${command.name}\` was reloaded!**`);
            console.log(("[reload] Reloaded "+command.name))
		} catch (error) {
			console.log(error);
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};