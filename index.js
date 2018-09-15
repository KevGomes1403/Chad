const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("VSauce", {type: "WATCHING"});
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (cmd === `${prefix}info`) {
  	return message.channel.send("I'm a `bot` made by Kevin, and I hate Gabe.");
  } else if (cmd == `${prefix}avatar`) {
    return message.channel.send(message.author.avatarURL);
  } else if (cmd == `${prefix}quote`) {
    var random = Math.random() * 100;
    if (random < 30) {
      return message.channel.send("Awesome like a possum.")
    } else if (random < 60) {
      return message.channel.send("PERFORMANCE TASK")
    } else if (random < 99) {
      return message.channel.send("I took this test this morning and got a C, but a bunch of smart students like you should do just fine.")
    }
  }

});

bot.login(botconfig.token);
