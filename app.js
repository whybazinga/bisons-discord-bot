const Discord = require('discord.js');

const { token } = require('./top-secret');
const util = require('./util');

const bot = new Discord.Client();

bot.on('ready', () => {
  console.log('Bot is up');
});

bot.on('message', (msg) => {
  if (msg.author.username.toLowerCase() !== 'bisons bot') {
    const msgInfo = util.checkContent(msg.content);
    if (msgInfo.state) {
      switch (msgInfo.lang) {
        case 'ru':
          msg.channel.send(util.getMoo('м', 'у'));
          break;

        case 'en':
          msg.channel.send(util.getMoo('m', 'o'));
          break;

        case 'mixed':
          msg.channel.send(util.getMoo('m', 'o', 5) + ' cyka blyat');
          break;

        default:
          msg.channel.send('moo wat?');
          break;
      }
    }
  }
});

bot.login(token);
