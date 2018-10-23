const Discord = require('discord.js');

const { token } = require('./top-secret');
const util = require('./util');

const BisonsFactoryClass = require('./bisons-factory');

const bisonsFactory = new BisonsFactoryClass();
const bot = new Discord.Client();

const activeBisons = {};


const jdNotifier = require('./jd-notifier');

bot.on('ready', () => {
  console.log('Bot is up');
});

bot.on('message', (msg) => {
  if (msg.author.username.toLowerCase() !== 'bisons bot') {
    const locale = util.checkLocale(msg.content);
    if (locale !== 'init') {
      if (activeBisons.hasOwnProperty(locale)) {
        msg.channel.send(activeBisons[locale].sound);
      } else {
        activeBisons[locale] = bisonsFactory.createBison(locale);
        msg.channel.send(activeBisons[locale].sound);
      }
    } // else {
    // switch (msg.content) {
    //   case '!start':
    //     jdNotifier.start(
    //       msg.channel.send,
    //       'Dark Bisons',
    //       'https://www.joindota.com/en/leagues/europe/971-season-14/group/90-groupstage/887-europe-3-1',
    //       1000,
    //     );
    //     break;
    //   case '!stop':
    //     jdNotifier.stop();
    //     break;
    //   default:
    //     break;
    // }
    // }
  }
});

bot.login(token);
