const Discord = require("discord.js");
const { Client, MessageEmbed, Collection, Guild } = require("discord.js");

module.exports = {
  name: "unban",
  alias: ["desbanear"],
  description: "Desbanea a una id.",
  usage: "{ id } [razon]",
  perms: ["BAN_MEMBERS"],
  clientperms: ["BAN_MEMBERS"],

  execute(client, message, args) {
    let userID = args[0];
    if (!userID) return message.channel.send("Pon una ID valida");

    let razon = args.slice(1).join(" ") || "sin razon";

    message.guild.bans.fetch().then((bans) => {
      if (bans.size == 0)
        return message.channel.send(
          "No hay ningun ban registrado en este servidor"
        );
      let unbanuser = bans.find((b) => b.user.id == userID);
      if (!unbanuser)
        return message.channel.send(
          "No existe el usuario mencionado o no esta baneado"
        );
      message.guild.members.unban(unbanuser.user);
      const embedunban = new Discord.MessageEmbed()
        .setTitle(`Desbaneo`)
        .setDescription(
          `el usuario <@${userID}> ha sido desbaneado por <@${message.author.id}>`
        )
        .addField(`Razon`, `**${razon}**`)
        .setTimestamp()
        .setColor("GREEN");
      message.channel.send({ embeds: [embedunban] });
    });
  },
};
