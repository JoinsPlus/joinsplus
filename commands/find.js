const Discord = require("discord.js");
const db = require('../db')

// const decrypt = (hash) => {
//   const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
//   const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
//   return decrpyted.toString();
// };

function randomnum(min, max) {
  if (isNaN(min || max)) return "Input needs to be a Number.";
  return Math.floor(Math.random() * (max - min) + min);
}

const emojies = [
  '✅',
  '⏩',
  '❌'
]
const sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

const settingUpEmbed = new Discord.MessageEmbed()
  .setTitle("Setting up... Wait a moment!")
  .setColor(15158332)
  .setTimestamp();

module.exports = {
  name: 'find',
  description: 'Find a Server to join 2.0',
  aliases: ['f', 'join', 'j'],
  cooldown: process.env.ISDEBUG === "true" ? 5 : 30, //If it's the JoinsMinus bot, 5 second cooldown, otherwise 30
  /**
   * @param {Discord.Message} message
   * @param {String[]} args
   * @param {Discord.Client} client
   */
  async execute(message, args, client) {
    let guild;
    let viewed = []
    async function guildInvite() {
      guild = await db.getGuildInvite({
        userID: message.author.id,
        ignored: viewed
      })
      if (guild.status) {
        menu.edit(new Discord.MessageEmbed().setTitle("We're all out!").setColor(15158332).setTimestamp().setDescription(guild.status)).setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Red_X.svg/768px-Red_X.svg.png");
        menu.reactions.removeAll()
        return
      }
      console.log(guild)
      viewed.push(guild._id)
      if (!guild.iconurl) {
        guild.iconurl = "https://yt3.ggpht.com/ytc/AAUvwniEUaBNWbH9Pk7A1cmIBdxnYt0YYrgNKx5h8grSMA=s176-c-k-c0x00ffffff-no-rj";
      }
      if (!guild.description) {
        guild.description = "This guild hasn't provided a description yet";
      }
      menu.edit(new Discord.MessageEmbed().setTitle(`${guild.name}`).setDescription(guild.description).setFooter('✅ to join the guild, ⏩ to show another guild or ❌ to never show this again').setThumbnail(guild.iconurl).setColor(3066993)).catch((err) => { return; })
      handleReaction()
    }
    function handleReaction() {
      const collector = menu.createReactionCollector((reaction, user) => emojies.includes(reaction.emoji.name) && user.id === message.author.id, { max: 1, time: 60000 });
      let isUsed = false
      collector.on('collect', async (reaction, user) => {
        isUsed = true
        if (reaction.emoji.name === "✅") {
          //JOIN SERVER & ADD COIN TO MEMBER & SET OWNER OF ORDER TO THIS GUY
          //client.guilds.resolve('810480812662718484').addMember()
          menu.reactions.resolve('✅').users.remove(user.id).catch((err) => { return; })
          menu.edit(new Discord.MessageEmbed().setTitle("Hold on!").setDescription(`Joining ${guild.name}`).setThumbnail('https://cdn.discordapp.com/emojis/780159108124901396.gif?v=1')).setColor(9807270)
          await sleep(2500)
          guildInvite()
        } else if (reaction.emoji.name === "⏩") {
          //SKIP SERVER & PRESAVE FOR THIS MENU SO IT DOENS'T GET SHOWED AGAIN WHILE USING THE SAME
          menu.reactions.resolve('⏩').users.remove(user.id).catch((err) => { return; })
          guildInvite()
        } else if (reaction.emoji.name === "❌") {
          menu.reactions.resolve('❌').users.remove(user.id).catch((err) => { return; })
          await db.User.updateOne({
            _id: user.id
          },
            {
              $push: {
                ignored: guild.id
              }
            })
          //IGNORE SERVER FROM USERS LIST
          guildInvite()
        }
      })

      collector.on('end', collected => {
        if (!isUsed) {
          menu.edit(new Discord.MessageEmbed().setTitle(`Menu expired due to inactivity.`).setTimestamp().setColor(15158332)).catch((err) => { return; })
          menu.reactions.removeAll().catch((err) => { return; })
        }
      });
    }
    const menu = await message.channel.send(settingUpEmbed)
    await menu.react("✅")
    await menu.react("⏩")
    await menu.react("❌")
    let user = await db.getUser(message.author.id)
    for (let i = 0; i < user.ignored.length; i++)
      viewed.push(user.ignored[i])
    console.log(viewed)
    try {
      guildInvite()
      handleReaction()
    } catch (error) {
      return;
    }
  },
};