const { SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')


module.exports = {//exportamas
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Muestra el ping del bot'),
    async execute(client, interaction){


        
 let embed = new Discord.MessageEmbed()
 .setTitle("Ping")
 .setDescription(`> Latencia del API: ${client.ws.ping}\n> Delay de los mensajes: ${Date.now() - interaction.createdTimestamp}`)
 .setColor("RANDOM")
interaction.reply({ embeds: [embed] });


        
        }
     }