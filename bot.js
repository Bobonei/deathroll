// Require and configure dotenv
require('dotenv').config();

const { Client, Intents } = require('discord.js');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const prefix = '!';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'roll') {
    if (!args.length) {
      return message.reply('Please provide the maximum number for the roll.');
    }
    
    const maxNumber = parseInt(args[0]);
    if (isNaN(maxNumber) || maxNumber <= 0) {
      return message.reply('Please provide a valid number greater than zero.');
    }
    
    const rollResult = Math.floor(Math.random() * maxNumber) + 1;

    if (rollResult === 1) {
      return message.channel.send(`🎲 You rolled a 1 out of ${maxNumber}! and lost the game. 😞`);
    }

    message.channel.send(`🎲 You rolled a ${rollResult} out of ${maxNumber}!`);
  }
});

// Access token from environment variable
client.login(process.env.BOT_TOKEN);
