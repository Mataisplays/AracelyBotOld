const { SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')


module.exports = {//exportamas
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Limpia la cantidad de mensajes que quieras')
    .addIntegerOption(a => a.setName("cantidad").setRequired(true).setDescription("La cantidad de mensajes que quieres borrar")),
    async execute(client, interaction){

        if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply('No tienes permisos para usar ese comando')
        if(!interaction.guild.me.permissions.has("MANAGE_MESSAGES")) return interaction.reply('No tengo el permiso de administrar mensajes para poder borrar los comandos')

    let number = await interaction.options.getInteger("cantidad")

    if(!number < 0) return interaction.reply('Debes poner una cantidad mayor a 0')
    
    interaction.channel.bulkDelete(parseInt(number), true).then(msgs => {
        interaction.reply({ content: `Se han borrado con exito ${msgs.size} mensajes`, ephemeral: true})
    })
        
        }
     }