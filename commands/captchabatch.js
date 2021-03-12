const Discord = require("discord.js")
const http = require('http')
const db = require("../db")
const fs = require('fs')

function saveImg() {
  const captcha = db.captchaGen()
  return new Promise((resolve, reject) => {
    http.get({
      host: 'http.api.dojnaz.net',
      port: 80,
      path: captcha.url.substr(22)
    }, (res) => {
      let writeStream = fs.createWriteStream("./capbatch/" + captcha.code + "/" + captcha.url.split('/').pop())
      res.on('data', (chunk) => {
        writeStream.write(chunk)
      })
      res.on('end', () => {
        writeStream.close()
        resolve()
      })
    })
  })
}

module.exports = {
  name: 'capbatch',
  description: 'ur mom',
  cooldown: 5,
  async execute(message, args, client) {
    if (process.env.OWNERS.includes(message.author.id)) {
      if (!fs.existsSync('./capbatch')) fs.mkdirSync('./capbatch')
      for (let i = 0; i < 8; i++)
        if (!fs.existsSync('./capbatch/' + (i + 1)))
          fs.mkdirSync('./capbatch/' + (i + 1))

      for (let i = 0; i < 1000; i++) {
        let awaitables = []
        for (let i = 0; i < 25; i++)
          awaitables.push(saveImg())
        await Promise.all(awaitables)
      }
      message.reply("Done")
      return;
    }
  },
};

