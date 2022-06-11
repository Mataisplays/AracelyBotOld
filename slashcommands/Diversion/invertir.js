const { SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const Zeew = require('zeew')

module.exports = {//exportamas
    data: new SlashCommandBuilder()
    .setName('reversecolor')
    .setDescription('Invierte los colores del perfil de un usuario')
    .addUserOption( x=> x.setName('usuario').setDescription('Usuario a invertirle los colores').setRequired(true)),
    async execute(client, interaction){

        let user = interaction.options.getUser("usuario") || interaction.author 
    let img = new Zeew.img(process.env.zeew)
    
    let a = await img.filter.invertir(user.displayAvatarURL({ format: 'png'}))

    let asd = new Discord.MessageAttachment(a, "xd.jpg")

    interaction.reply({ files: [asd], content: "imagen hecha correctamente" })
        
        }
     }