const { SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')


module.exports = {//exportamas
    data: new SlashCommandBuilder()
    .setName('snipe')
    .setDescription('revisa el ultimo mensaje borrado')
    .addChannelOption(option => option.setName('canal').setDescription('Selecciona un canal').setRequired(false)),
    async execute(client, interaction){
        const channels = interaction.options.getChannel('canal') || interaction.channel;
  if(!channels.isText()) return interaction.reply('Eso no es un canal de texto!')
      const msg = client.snipes.get(channels.id);
  
      if (!msg) {
        interaction.reply("no han borrado un mensaje recientemente");
      } else {
        const embeda = new Discord.MessageEmbed()
  
          .setTitle("**Mensaje Snipeado**")
          .setAuthor(
            `mensaje escrito por ${msg.delete.tag}`,
            msg.delete.displayAvatarURL()
          )
          .addField(`canal`, `<#${msg.canal.id}>`)
          .setDescription(`${msg.content}`)
          .setColor("GREEN");
  
        interaction.reply({ embeds: [embeda] });
      }
        }
     }