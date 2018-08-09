const Discord = require('discord.js');
const {token} = require('./top-secret');

const bot = new Discord.Client();

bot.on('ready', () => {
  console.log('Bot is up');
})

bot.on('message',(msg) => {
  if (msg.content.toLowerCase() === 'bisons'){
    msg.channel.sendMessage('mooooo');
  }
})

bot.login(token);