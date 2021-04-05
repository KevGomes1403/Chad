const fs = require('fs');
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const { prefix, token } = require('./botconfig.json');

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands')
  .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("with hearts", {type: 'Playing'});
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

	let args = message.content.slice(prefix.length).split(/ +/);
  let commandName = args.shift().toLowerCase();

  if (!bot.commands.has(commandName)) return;

  const command = bot.commands.get(commandName)
  		|| bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('I can\'t execute commands within DMs.');
  }

  if (command.args && !args.length) {
    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  }

  try {
    command.execute(message, args);
  } catch(error) {
    console.error(error);
    message.reply('there was an error trying to execute that command');
  }
});

bot.login(botconfig.token);
