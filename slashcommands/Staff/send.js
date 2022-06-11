const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  //exportamas
  data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("Envia un mensaje a un canal en especifico")
    .addChannelOption((x) =>
      x
        .setName("canal")
        .setDescription("Canal donde se enviara el mensaje")
        .setRequired(true)
    )
    .addStringOption((x) =>
      x
        .setName("mensaje")
        .setDescription("El mensaje a enviar")
        .setRequired(true)
    ),
  async execute(client, interaction) {
    let canal = interaction.options.getChannel("canal");

    let texto = interaction.options.getString("mensaje");

    if (!canal.isText()) return interaction.reply("El canal no es de texto");
    if (!canal.permissionsFor(interaction.guild.me).has("SEND_MESSAGES"))
      return interaction.reply({
        content: `No tengo permisos de mandar mensajes en ese canal`,
      });

    interaction.reply(`Has mandado correctamente el mensaje : ${texto}`);

    canal.send(texto, {
      allowedMentions: { parse: [] },
    });
  },
};
