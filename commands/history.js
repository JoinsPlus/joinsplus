const Discord = require("discord.js");
const db = require("../db")
module.exports = {
    name: 'history',
    description: 'history cmd',
    cooldown: 1,
    /**
     * @param {Discord.Message} message
     * @param {String[]} args
     * @param {Discord.Client} client
     */
    async execute(message, args, client) {
        function errorembed(issue) {
            const errormbed = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setTitle(" ⠀  ⠀  ⠀  ⠀  ⠀ ERROR! ⠀  ⠀  ⠀  ⠀  ⠀ ")
                .setDescription(`\`\`\`${issue}\`\`\``)
                .setColor(9807270)
                .setTimestamp();
            return message.channel.send(errormbed).catch((err) => { return; })
        }
        async function noargs(message) {
            let user = await db.getUser(message.author.id)
            let historyembed = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setColor(9807270)
                .setTimestamp();
            let history = user.history.toObject();
            if (history.length < 8) {
                historyembed.setTitle(`Last ${history.length} transactions`)
                historyembed.setDescription("```" + (history.slice(-8).reverse().join('\n') || "No history yet!") + "```")
            } else {
                historyembed.setTitle(`Last 8 transactions`)
                historyembed.setFooter(`All transactions: ${history.length}`)
                historyembed.setDescription("```" + (history.slice(-8).reverse().join('\n') || "No history yet!") + "```")
            }
            return message.channel.send(historyembed).catch((err) => { return; })
        }
        if (!args[0]) {
            noargs(message);
        } else if (args[0]) {
            if (isNaN(args[0])) return errorembed(`${args[0]} is not a Number.`);
            if (args[0].length > 5) return errorembed(`${args[0]} can only be 5 long.`)
            if (parseInt(args[0]) > 9999) return errorembed(`${args[0]} :/\nThats a bit to big...`)
            let user = await db.getUser(message.author.id)
            let history = user.history.toObject();
            if (parseInt((history.length / 8) + 1) < parseInt(args[0])) return errorembed(`This page doens\'t exist.\nLast page: ${parseInt((history.length / 8) + 1)}`)
            if (parseInt(args[0]) == 1) {
                noargs(message);
            } else {
                function sort(histories) {
                    let historyoutput = []
                    let hcache = [];
                    var i = 0;
                    var a = 0;
                    var b = 0;
                    var d = 0;
                    var maxi = parseInt(histories.length / 8);
                    histories.forEach(element => {
                        i++
                        if(maxi == b){
                            var c = histories.length - (b*8);
                            if(d == c){
                                historyoutput[a] = hcache;
                                a++ 
                            }
                            hcache.push(element)
                        }
                        if (i == 8) {
                            b++;
                            i = 0;
                            historyoutput[a] = hcache;
                            a++ 
                            hcache = [];
                        }
                        hcache.push(element);
                    });
                    return historyoutput;
                }
                let output = sort(history)
                console.log(output)
                let rlyoutput = `${output[parseInt(args[0])][0]}\n${output[parseInt(args[0])][1]}\n${output[parseInt(args[0])][2]}\n${output[parseInt(args[0])][3]}\n${output[parseInt(args[0])][4]}\n${output[parseInt(args[0])][5]}\n${output[parseInt(args[0])][6]}\n${output[parseInt(args[0])][7]}`
                message.channel.send(rlyoutput)
            }
        }
    }
}