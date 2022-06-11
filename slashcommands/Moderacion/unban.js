const { SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')


module.exports = {//exportamas
    data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Desbanea a un usuario con su ID')
    .addStringOption(x => x.setName('id').setDescription('La id a desbanear').setRequired(true))
    .addStringOption(x => x.setName('razon').setDescription('La razon para desbanear al usuario')),
    async execute(client, interaction){


    let userID = interaction.options.getString('id');
    if(isNaN(userID)) return interaction.reply("La id no es un numero")

    let razon = interaction.options.getString("razon") || "sin razon";

    interaction.guild.bans.fetch().then((bans) => {
      if (bans.size == 0)
        return interaction.reply(
          "No hay ningun ban registrado en este servidor"
        );

      let unbanuser = bans.find((b) => b.user.id == userID);
      if (!unbanuser)
        return interaction.reply(
          "No esta baneado o no existe el usuario mencionado"
        );
      interaction.guild.members.unban(unbanuser.user, `${razon}`);
      const embedunban = new Discord.MessageEmbed()
        .setTitle(`Desbaneo`)
        .setDescription(
          `el usuario <@${userID}> ha sido desbaneado por <@${interaction.user.id}>`
        )
        .addField(`Razon`, `**${razon}**`)
        .setTimestamp()
        .setColor("GREEN");
      interaction.reply({ embeds: [embedunban] });
    });
        
        }
     }