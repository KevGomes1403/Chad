const Discord = require("discord.js");

module.exports = {
  name: 'serverinfo',
  description: 'Information about the server',
  execute(message, args) {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
      .setDescription("Server Information")
      .setColor ("#00ffdd")
      .setThumbnail(sicon)
      .addField("Server Name", message.guild.name, true)
      .addField("Created On", message.guild.createdAt, true)
      .addField("You Joined", message.member.joinedAt, true)
      .addField("Total Members", message.guild.memberCount, true)

    message.channel.send(serverembed);
  },
};
