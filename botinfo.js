const Discord = require("discord.js");

module.exports = {
  name: 'botinfo',
  description: 'Information about the bot',
  execute(message, args) {
    let bicon = Discord.ClientUser.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
      .setDescription("Bot Information")
      .setColor("#00ffdd")
      .setThumbnail(bicon)
      .addField("Bot Name", Discord.ClientUser.user.username)
      .addField("Created On", Discord.ClientUser.user.createdAt)

    message.channel.send(botembed);
  },
};
