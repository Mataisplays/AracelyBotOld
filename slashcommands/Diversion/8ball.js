const { SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')


module.exports = {//exportamas
    data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Pregunta algo y obten una respuesta')
    .addStringOption(x => x.setName('pregunta').setDescription('La pregunta').setRequired(true)),
    async execute(client, interaction){

        let question = interaction.options.getString('pregunta')


if(question.length > 40) return interaction.reply("Tu pregunta es muy larga")
    let replies = ["si", "no", "talvez", "no lo se", "puedes repetir la pregunta?", "no lo creo", "creo que si"];

    let embed = new MessageEmbed()
    .setTitle("8 ball")
    .setDescription(`Pregunta: ${question}\nRespuesta: ${replies[Math.floor(Math.random() * replies.length)]}`)
    .setColor("RANDOM")

    interaction.reply({ embeds: [embed] })
        
        }
     }