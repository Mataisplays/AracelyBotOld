const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  //exportamas
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("has que yo diga algo")
    .addStringOption((option) =>
      option
        .setName("texto")
        .setDescription("Lo que quieres que diga")
        .setRequired(true)
    ),
  async execute(client, interaction) {
    let text = interaction.options.getString("texto");

    if (
      !interaction.channel
        .permissionsFor(interaction.guild.me)
        .has("SEND_MESSAGES")
    )
      return interaction.reply({
        content: `No tengo permisos de mandar mensajes aqui`,
        ephemeral: true,
      });

    if (!interaction.member.permissions.has("MANAGE_MESSAGES"))
      text += `\n\n**-${
        interaction.member.nickname
          ? interaction.member.nickname
          : interaction.user.username
      }**`;

    interaction.channel.send(`${text}`);

    interaction.reply({
      content: `Se ha mandado el texto con exito`,
      ephemeral: true,
    });
    console.log(text)
    //
  },
};
