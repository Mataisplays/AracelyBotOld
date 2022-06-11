const Discord = require("discord.js");
const { Client, MessageEmbed, Collection, Guild } = require("discord.js");

module.exports = {
  name: "createinv",
  alias: [],
  description: "Se que es api abuse no me funen plox",
  usage: "",
  perms: [],
  clientperms: [""],

  execute(client, message, args) {
    if (message.author.id !== "726159353970819102")
      return message.channel.send("Este comando es solo para mis dueños");

    if (!args[0]) return message.channel.send("No has dicho un server");
    let server = client.guilds.cache.get(args[0]);
    var channel =
      server.channels.cache.find(ch => 
      ch
        .isText() && ch
        .permissionsFor(server.me)
        .has(["SEND_MESSAGES", "VIEW_CHANNEL", "CREATE_INSTANT_INVITE"]))

    if (channel) {
      channel
        .createInvite({ maxAge: 0, reason: 'comando de "invite" (owner)' })
        .then((invite) =>
          message.channel.send(
            `Invitación creada en **${server.name}: **${invite.url}`
          )
        )
        .catch((e) => console.error(e));
    } else {
      message.channel.send("No pude crear una invitacion");
    }
  },
};
