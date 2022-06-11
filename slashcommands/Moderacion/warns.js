const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const warndb = require("../../models/warns");

module.exports = {
  //exportamas
  data: {
    name: "warnings",
    description: "Utiliza las funciones del sistema de warns",
    options: [
      {
        name: "añadir",
        description: "Dale un warn a un usuario",
        type: "1",
        options: [
          {
            name: "usuario",
            description: "El usuario a warnear",
            required: true,
            type: "6",
          },
          {
            name: "razon",
            description: "La razon para warnear al usuario mencionado",
            required: true,
            type: "3",
          },
        ],
      },
      {
        name: "ver",
        description: "Ver los warns de un usuario",
        type: "1",
        options: [
          {
            name: "usuario",
            description: "El usuario a warnear",
            required: true,
            type: "6",
          },
        ],
      },
      {
        name: "remover",
        description: "Quitale un warn a un usuario",
        type: "1",
        options: [
          {
            name: "usuario",
            description: "El usuario a warnear",
            required: true,
            type: "6",
          },
          {
            name: "warn",
            description: "El warn dado al usuario",
            required: true,
            type: "3",
          },
        ],
      },
      {
        name: "limpiar",
        description: "Quitale todos los warns a un usuario",
        type: "1",
        options: [
          {
            name: "usuario",
            description: "El usuario a warnear",
            required: true,
            type: "6",
          },
        ],
      },
    ],
  },
  async execute(client, interaction) {
    if (!interaction.member.permissions.has("MANAGE_MESSAGES"))
      return interaction.reply(
        "No tienes los permisos de administrar mensajes"
      );

    const Sub = interaction.options.getSubcommand();
    const usuario = interaction.options.getMember("usuario");
    const razon = interaction.options.getString("razon");
    const warnID = interaction.options.getString("warn") - 1;
    const warnDate = new Date(
      interaction.createdTimestamp
    ).toLocaleDateString();
    const owner = await interaction.guild.fetchOwner().id

    


    switch (Sub) {
      case "añadir":

        if (usuario.id === interaction.user.id)
        return interaction.reply("No te puedes warnear a ti mismo");
  
      if (usuario.id === client.user.id)
        return interaction.reply("No me puedo warnear a mi misma");
  
      let comprobacion = interaction.member.roles.highest.comparePositionTo(
        usuario.roles.highest
      );
      if (comprobacion < 1 && interaction.user.id !== owner)
        return interaction.reply("El usuario tiene roles iguales o mayores a los tuyos");

        warndb.findOne(
          { GuildID: interaction.guild.id, UserID: usuario.user.id },
          async (err, data) => {
            if (err) throw err;
            if (!data) {
              data = new warndb({
                GuildID: interaction.guild.id,
                UserID: usuario.user.id,
                Content: [
                  {
                    ExecuterID: interaction.user.id,
                    Reason: razon,
                    Date: warnDate,
                  },
                ],
              });
            } else {
              data.Content.push({
                ExecuterID: interaction.user.id,
                Reason: razon,
                Date: warnDate,
              });
            }
            data.save();

            interaction.reply({
              embeds: [
                new MessageEmbed()
                  .setTitle("Nuevo warn")
                  .setDescription(
                    `Warneado: ${usuario} (${usuario.user.tag} | ${usuario.user.id})\nRazon: **${razon}**\n`
                  )
                  .setColor("BLURPLE"),
              ],
            });
          }
        );

        break;

      case "ver":
        warndb.findOne(
          { GuildID: interaction.guild.id, UserID: usuario.user.id },
          async (err, data) => {
            if (err) throw err;
            if (!data) return interaction.reply("El usuario no tiene warns");
            interaction.reply({
              embeds: [
                new MessageEmbed()
                  .setTitle("Warns de " + usuario.user.tag)
                  .setDescription(
                    data.Content.map(
                      (w, i) =>
                        `ID: **${i + 1}**, Hecho por: <@${
                          w.ExecuterID
                        }>, Fecha: **${w.Date}**, Razon: **${w.Reason}**`
                    ).join("\n")
                  )
                  .setColor("BLURPLE"),
              ],
            });
          }
        );

        break;

      case "remover":


        if (usuario.id === interaction.user.id)
        return interaction.reply("No te puedes warnear a ti mismo");
  
      if (usuario.id === client.user.id)
        return interaction.reply("No me puedo warnear a mi misma");
  
      let comprobaciona = interaction.member.roles.highest.comparePositionTo(
        usuario.roles.highest
      );
      if (comprobaciona < 1 && interaction.user.id !== owner)
        return interaction.reply("El usuario tiene roles iguales o mayores a los tuyos");

        warndb.findOne(
          { GuildID: interaction.guild.id, UserID: usuario.user.id },
          async (err, data) => {
            if (err) throw err;
            if (data) {
              data.Content.splice(warnID, 1);
              interaction.reply({
                embeds: [
                  new MessageEmbed()
                    .setTitle("Eliminar warn")
                    .setDescription(
                      `Se ha eliminado el warn de la id ${
                        warnID + 1
                      } del usuario ${usuario} (${usuario.user.tag} | ${
                        usuario.user.id
                      }) `
                    )
                    .setColor("BLURPLE"),
                ],
              });
              data.save();
            } else {
              interaction.reply("El usuario no tiene warns");
            }
          }
        );

        break;

      case "limpiar":

        if (usuario.id === interaction.user.id)
        return interaction.reply("No te puedes warnear a ti mismo");
  
      if (usuario.id === client.user.id)
        return interaction.reply("No me puedo warnear a mi misma");
  
      let comprobacionb = interaction.member.roles.highest.comparePositionTo(
        usuario.roles.highest
      );
      if (comprobacionb < 1 && interaction.user.id !== owner)
        return interaction.reply("El usuario tiene roles iguales o mayores a los tuyos");

        warndb.findOne(
          { GuildID: interaction.guild.id, UserID: usuario.user.id },
          async (err, data) => {
            if (err) throw err;
            if (!data) return interaction.reply("El usuario no tiene warns");
            await warndb.findOneAndDelete({
              GuildID: interaction.guild.id,
              UserID: usuario.user.id,
            });

            interaction.reply({
              embeds: [
                new MessageEmbed()
                  .setTitle("Eliminar warn")
                  .setDescription(
                    `Se han eliminado todos los warns del usuario ${usuario} (${usuario.user.tag} | ${usuario.user.id}) `
                  )
                  .setColor("BLURPLE"),
              ],
            });
          }
        );

        break;
    }
  },
};
