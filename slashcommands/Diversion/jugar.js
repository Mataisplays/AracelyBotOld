const { SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const DiscordTogether = require('discord-together')

module.exports = {//exportamas
    data: new SlashCommandBuilder()
    .setName('discord-together')
    .setDescription('Usa las actividades de discord')
    .addStringOption(option =>
		option.setName('tipo')
			.setDescription('La actividad')
			.setRequired(true)
			.addChoice('Youtube', 'yt')
			.addChoice('Pesca', 'fish')),
    async execute(client, interaction){


    client.discordTogether = new DiscordTogether.DiscordTogether(client);
    if(!interaction.member.voice.channel) return interaction.reply("No estas en un canal de voz")
    if(!interaction.member.voice.channel.permissionsFor(interaction.guild.me).has("CONNECT")) return interaction.reply("No tengo el permiso **CONNECT** para empezar una actividad en el canal de voz")
    let type = interaction.options.getString('tipo');
      console.log(type)
    switch(type){
      case 'yt':
        client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtube').then(async invite => {
        
          let embed = new MessageEmbed()
          .setTitle("Aqui esta tu codigo!")
          .setDescription(`[Click aqui](${invite.code})`)
          .setColor("RED")
          interaction.reply({ embeds: [embed], ephemeral: true})


      })

      break;
      case 'fish':
        client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'fishing').then(async invite => {
        
          let embed = new MessageEmbed()
          .setTitle("Aqui esta tu codigo!")
          .setDescription(`[Click aqui](${invite.code})`)
          .setColor("BLUE")
          interaction.reply({ embeds: [embed], ephemeral: true})
     
          

      })

      break;

     }
    }
}