const { SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const fetch = require('node-superfetch')

module.exports = {//exportamas
    data: new SlashCommandBuilder()
    .setName('nasa')
    .setDescription('Obten algo de la api de la naza'),
    async execute(client, interaction){

        const { body } = await fetch.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.nasa}`)

        let embed = new MessageEmbed()
        .setTitle(`${body.title}`)
        .setDescription(body.explanation + `[[Descargar imagen]](${body.hdurl})`)
        .setImage(body.hdurl)
        .setColor("RANDOM")
        
     interaction.reply({ embeds: [embed]})
        
        }
     }