const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  //exportamas
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Banea al usuario mencionado")
    .addUserOption((x) =>
      x
        .setName("usuario")
        .setDescription("El usuario a banear")
        .setRequired(true)
    )
    .addStringOption((x) =>
      x.setName("razon").setDescription("La razon para banear al usuario")
    ),
  async execute(client, i) {
    let user = i.options.getMember("usuario");
    if (user.id == client.user.id)
      return message.channel.send("No me puedo banear a mi mismo");
    if (user.id == i.user.id)
      return message.channel.send("No te puedes banear a ti mismo");
    let banReason = i.options.getString("razon") || "sin razon";

    if (!i.guild.me.permissions.has("BAN_MEMBERS"))
      return message.channel.send("No tengo el permiso de banear miembros");
    if (!i.member.permissions.has("BAN_MEMBERS"))
      return message.channel.send("No tienes el permiso de banear miembros");

    if (i.member.roles.highest.position <= user.roles.highest.position)
      return message.channel.send(
        "El usuario tiene un rol mas alto que el tuyo"
      );

    if (user.id === i.user.id)
      return message.channel.send(`No te puedo banear a ti mismo`);
    if (user.id === client.user.id)
      return message.channel.send(`No me puedo banear a mi mismo`);

    if (!user.bannable)
      return message.channel.send("No puedo banear a ese usuario");
    user.ban({ reason: `${i.user.tag} baneo: ${banReason}` });
    const embed = new MessageEmbed()
      .setTitle("Usuario baneado")
      .setDescription(`**${user.user.tag} fue baneado por ${i.user}**`)
      .addField("Razon", banReason)
      .setColor("GREEN");
    i.reply({ embeds: [embed] });
  },
};
