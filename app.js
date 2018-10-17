const Discord = require('discord.js');

const { token } = require('./top-secret');
const util = require('./util');

const BisonsFactoryClass = require('./bisons-factory');

const bisonsFactory = new BisonsFactoryClass();
const bot = new Discord.Client();

const activeBisons = {};

bot.on('ready', () => {
  console.log('Bot is up');
});

bot.on('message', (msg) => {
  if (msg.author.username.toLowerCase() !== 'bisons bot') {
    const locale = util.checkLocale(msg.content);
    if (activeBisons.hasOwnProperty(locale)) {
      msg.channel.send(activeBisons[locale].sound);
    } else {
      activeBisons[locale] = bisonsFactory.createBison(locale);
    }
  }
});

bot.login(token);
