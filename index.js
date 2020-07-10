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

bot.on ("guildMemberAdd", member => {
  const channel = member.guild.channels.find(ch => ch.name === "off-topic");
  if (!channel) { return; }
  channel.send('${member} has succumbed to the greatest regime in existence');
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




  /*
  if (args[0] === `botinfo`) {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#00ffdd")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)

    message.channel.send(botembed);
  }

  if (cmd === `${prefix}ping`) {
    client.commands.get('ping').execute(message, agrs);
  }






  Real business begins here

  if (cmd === `${prefix}greet`) {
    if (messageArray[1] === 'me') {
      message.channel.sendMessage('Hey there');
    } else {
      message.channel.sendMessage("See ya");
    }
  }

  // Profanity filter
  if (message.content.match('frick') || message.content.match('suck') ||
      message.content.match('fuck') || message.content.match('shit')) {
    message.channel.sendMessage("Hey no cursing");
  }

  if (message.content.toLowerCase().match('nigga')) {
    let emoji = message.guild.emojis.find('name', 'gulag');
    message.react(emoji);
  }


  if (cmd === `${prefix}fetch`) {
    channel.messages.fetch()
      .then(message => messages.channel.sendMessage(`${messages.filter(m => m.author.id ===
      '706559181045497907').size} messages`))
      .catch(console.error);
  }

  */

});

function nwordSearch() {
  // To be worked on
}

bot.login(botconfig.token);
